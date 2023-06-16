import React, { useState } from 'react';

import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { BsGithub } from 'react-icons/bs';
import { AiFillSave } from 'react-icons/ai';

// styles
import classes from './editor-nav.module.css';
// components
import Logo from '../logo';
import Profile from '../profile';
import CodeLang from '../code-lang';
import SaveGistModal from './save-gist-modal';

import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { displayNotification } from '../../utils/displayNotification';

export default function EditorNav({ codeRef, editorRef, questionId, topicId, optionRef }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { authUser } = useAuth();

  const handleSaveCode = async () => setIsOpened(true);

  const handleSubmitCode = async (solution) => {
    setIsSubmitting(true);
    await axios
      .post(`http://localhost:3001/solution`, solution)
      .then(() => {
        displayNotification({
          mssg: (
            <p style={{ margin: 0 }}>
              <b>Success!</b> Code submitted.
            </p>
          ),
          color: 'green',
        });
      })
      .catch((_) => {
        displayNotification({
          mssg: (
            <p style={{ margin: 0 }}>
              <b>Error!</b> Something went wrong.
            </p>
          ),
          color: 'red',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
        setIsOpened(false);
      });
  };

  return (
    <div className={classes.wrapper}>
      <Logo src={'/assets/logo.png'} />
      <div className={classes.space} />
      <CodeLang optionRef={optionRef} />

      {questionId && (
        <Link to={`/discussion?q=${questionId}`}>
          <Button>Discuss</Button>
        </Link>
      )}
      <div className={classes.rightMenu}>
        <Button
          loading={isSubmitting}
          leftIcon={
            <AiFillSave
              style={{
                fontSize: '20px',
              }}
            />
          }
          variant="white"
          onClick={() =>
            handleSubmitCode({
              questionId,
              topicId,
              userId: authUser.uid,
              solutionCode: codeRef.current,
            })
          }
        >
          Submit Code
        </Button>
        <Button
          leftIcon={
            <BsGithub
              style={{
                fontSize: '20px',
              }}
            />
          }
          variant="white"
          onClick={handleSaveCode}
        >
          Save Code
        </Button>
        <SaveGistModal codeRef={codeRef} editorRef={editorRef} isOpened={isOpened} setIsOpened={setIsOpened} />
        <Profile />
      </div>
    </div>
  );
}
