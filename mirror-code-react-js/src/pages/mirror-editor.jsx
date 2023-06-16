import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import Split from 'react-split';
import queryString from 'query-string';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';

// style
import classes from '../styles/mirror-editor.module.css';

// components
import Room from '../components/mirror-editor/room';
import Editor from '../components/mirror-editor/editor';
import Prompt from '../components/mirror-editor/prompt';
import CenterLoading from '../components/center-loading';
import EditorNav from '../components/mirror-editor/editor-nav';

// local
import { useAuth } from '../hooks/useAuth';
import initSocket from '../configs/socket';
import { displayNotification } from '../utils/displayNotification';

function useQuestion(id) {
  return useQuery({
    queryKey: [id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3001/question/${id}`);
      return data.question;
    },
  });
}

function getPromptData(data) {
  return `
  ${data?.question_title}
  
  ${data?.question_prompt}
  
  Sample input:
  ${data?.sample_input}
  
  Sample output:
  ${data?.sample_output}
  
  Optimal Time & Space complexity:
  ${data?.optimal_complexity}
  
  `;
}

export default function MirrorEditor() {
  const socketRef = useRef();
  const codeRef = useRef('');
  const editorRef = useRef('');
  const optionRef = useRef('py');

  const navigate = useNavigate();
  const location = useLocation();
  const { r, u, q } = queryString.parse(location.search);

  const [roomUsers, setRoomUsers] = useState([]);
  const { authUser, loading } = useAuth();

  const handleError = () => {
    displayNotification({
      mssg: (
        <p style={{ margin: 0 }}>
          <b>Error!</b> Something went wrong.
        </p>
      ),
      color: 'red',
    });
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if ((!loading && !authUser) || r === '' || u === '') navigate('/', { replace: true });
  }, [authUser, loading]);

  // this effect wont run without a user
  useEffect(() => {
    if (!authUser) return;
    socketRef.current = initSocket();
    socketRef.current.on('connect_error', (_) => {
      console.log(_);
      handleError();
    });
    socketRef.current.on('connect_failed', (_) => {
      console.log(_);
      handleError();
    });
    // Emitters
    socketRef.current.emit('join_room', { username: u, room: r });
    // Listeners
    // (DEV) CATCH-ALL EVENTS
    // socketRef.current.onAny((event, ...args) => console.log(event, args));
    socketRef.current.on('message', (message) => {
      displayNotification({ mssg: <p style={{ margin: 0 }}>{message.text}</p>, color: 'blue' });
    });
    // get users inside the room
    socketRef.current.on('room_users', ({ joinedUser, users }) => {
      setRoomUsers(users);
      if (u !== joinedUser) socketRef.current?.emit('sync_prompt', { room: r, prompt: editorRef.current });
    });

    return () => {
      socketRef.current?.off('connect_error');
      socketRef.current?.off('connect_failed');
      socketRef.current?.off('room_users');
      socketRef.current?.off('message');
      socketRef.current?.disconnect();
    };
  }, [loading]);

  const { data } = useQuestion(q);

  useEffect(() => {
    const prompt = data ? getPromptData(data) : '';

    editorRef.current = prompt;
  }, [data]);
  
  const prompt = data ? getPromptData(data) : '';

  editorRef.current = prompt;

  if (loading || !authUser) return <CenterLoading height="100vh" width="100vw" />;

  return (
    <>
      <EditorNav optionRef={optionRef} codeRef={codeRef} editorRef={editorRef} questionId={q} topicId={data?.topicId}/>
      <div className={classes.wrapper}>
        <Split
          style={{ display: 'flex' }}
          sizes={[40, 60]}
          minSize={450}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
        >
          <div className={classes.prompt}>
            <Prompt socketRef={socketRef} room={r} editorRef={editorRef} />
            <Room roomUsers={roomUsers} room={r} />
          </div>
          <div className={classes.editor}>
            <Editor optionRef={optionRef} socketRef={socketRef} room={r} userName={u} codeRef={codeRef} />
          </div>
        </Split>
      </div>
    </>
  );
}
