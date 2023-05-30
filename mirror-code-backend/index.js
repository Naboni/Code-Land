const fs = require('fs');
const moment = require('moment');
const express = require('express');

// local imports
const { generateFile } = require('./generateFile');
const { formatMessage } = require('./utils/messages');
const { executePython } = require('./core/executePython');
const { userJoined, leaveRoom, getCurrentUser, getRoomUsers } = require('./utils/users');

const { getTopics } = require('./controllers/questions');

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

const app = express();
app.use(express.json());

app.use(allowCrossDomain);

app.get('/topics', async (req, res) => {
  const topics = await getTopics();
  return res.json(topics);
});

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    // origin: "https://mirror-code.web.app",
    // origin: "http://localhost:3000",
    origin: true,
  },
});

const serverName = 'Mirror-Code';
// runs when a new client connects
io.on('connection', (socket) => {
  console.log('=================================');
  socket.on('join_room', ({ username, room }) => {
    if (!username) return;
    const user = userJoined(socket.id, username, room);
    socket.join(user.room);
    // notify the user that just joined
    socket.emit('message', formatMessage(serverName, 'You joined a room.'));
    // notify every user in the room except the user that just joined
    socket.to(user.room).emit('message', formatMessage(serverName, `${user.username} joined the room.`));
    // Send users and room info
    io.to(user.room).emit('room_users', { joinedUser: user.username, users: getRoomUsers(user.room) });
    console.log(user);
  });

  // Runs when user executes code
  socket.on('execute_code', async ({ room, payload }) => {
    const { language, code } = payload;
    // get time stamp for code execution
    const startDate = new Date();
    const submittedAt = moment(startDate).toString();
    let endDate;
    let executionTime;
    // tell users in the room that code is being executed
    socket.to(room).emit('code_executing');
    // execute the code
    try {
      const filePath = generateFile(language, code);
      const output = await executePython(filePath);
      fs.unlinkSync(filePath);

      endDate = new Date();
      executionTime = moment(endDate).diff(submittedAt, 'millisecond', true);
      // return the result for every user in the room
      io.to(room).emit('run_result', { submittedAt: moment(submittedAt).format('h:mm:ss a'), executionTime, output });
      console.log({ submittedAt: moment(submittedAt).format('h:mm:ss a'), executionTime, output });
    } catch (_) {
      console.log(_);
      io.to(room).emit('run_result', {
        submittedAt: moment(submittedAt).format('h:mm:ss a'),
        executionTime: executionTime ?? '>1000',
        output: { data: 'stdout maxBuffer length exceeded. Maybe there is a long running loop in your code?', stderr: true },
      });
    }
  });

  // Runs when prompt is synced
  socket.on('sync_prompt', ({ room, prompt }) => {
    socket.to(room).emit('prompt_sync', prompt);
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = leaveRoom(socket.id);
    if (user) {
      socket.leave();
      io.to(user.room).emit('message', formatMessage(serverName, `${user.username} has left the room`));
      // Send users and room info
      io.to(user.room).emit('room_users', { room: user.room, users: getRoomUsers(user.room) });
    }
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
