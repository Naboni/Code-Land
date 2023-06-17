const fs = require('fs');
const moment = require('moment');
const express = require('express');
const axios = require('axios');

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

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    // origin: "https://mirror-code.web.app",
    // origin: "http://localhost:3000",
    origin: true,
  },
});

const serverName = 'Mirror-Code';
const languages = {
  Cpp: ['cpp', '0'],
  Python: ['python3', '0'],
  Javascript: ['nodejs', '0'],
};
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

    // tell users in the room that code is being executed
    socket.to(room).emit('code_executing');
    // execute the code
    try {
      var program = {
        script: code,
        language: languages[language][0],
        versionIndex: languages[language][1],
        clientId: '731a1d8446e55977bb33306e2322f9cf',
        clientSecret: '34b98d5f73e3ac7167674fcfc6a0cd00b8bb0501a174ff4113529e6d1df66abd',
      };

      const { data } = await axios.post('https://api.jdoodle.com/v1/execute', program);
      const output = {
        data: data.output,
      };

      // return the result for every user in the room
      io.to(room).emit('run_result', { submittedAt: data.submittedAt ?? 'now', executionTime: data.executionTime ?? '1', output });
      console.log({ submittedAt: data.submittedAt, executionTime: data.executionTime, output });
    } catch (_) {
      console.log(_);
      io.to(room).emit('run_result', {
        submittedAt: moment(new Date()).format('h:mm:ss a'),
        executionTime: '>1000',
        output: { data: 'Something went wrong!', stderr: true },
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
