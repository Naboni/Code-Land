import React, { useState } from 'react';

import axios from 'axios';
import { FiLogIn } from 'react-icons/fi';
import { BsGithub } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import { Button, TextInput } from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';

// style
import classes from '../styles/index.module.css';
// local
import { useAuth } from '../hooks/useAuth';
import { oAuth } from '../services/githubAuthPopupSignIn';
// components
import Logo from '../components/logo';
import Profile from '../components/profile';
import CenterLoading from '../components/center-loading';
// local
import { createRoomInfo } from '../utils/createRoomInfo';
import { displayNotification } from '../utils/displayNotification';

export default function Home() {
  const { authUser, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (actionNumber) => {
    setIsLoading(true);
    // authenticate before creating a room
    try {
      if (!authUser) {
        const token = await oAuth();
        localStorage.setItem('O2', token);
      } else {
        if (actionNumber === 0) {
          const { success, username, room } = await createRoomInfo();
          if (success) return navigate(`/mirror-editor/?r=${room}&u=${username}`);
          throw new Error('Error');
        } else {
          if (value === '') throw new Error('Error');
          const { success, username } = await createRoomInfo();
          if (success) return navigate(`/mirror-editor/?r=${value}&u=${username}`);
          throw new Error('Error');
        }
      }
      setIsLoading(false);
    } catch (_) {
      setIsLoading(false);
      displayNotification({
        mssg: (
          <p style={{ margin: 0 }}>
            <b>Error!</b> Something went wrong.
          </p>
        ),
        color: 'red',
      });
    }
  };

  if (loading) return <CenterLoading height="100vh" width="100vw" />;
  return (
    <div className={classes.area}>
      <ul className={classes.circles}>
        {Array(10)
          .fill(null)
          .map((_, idx) => (
            <li key={idx}></li>
          ))}
      </ul>
      <HomeNav authUser={authUser} isLoading={isLoading} handleSubmit={handleSubmit} />
      <div className={classes.wrapper}>
        <div className={classes.hero}>
          <div className={classes.heroContent}>
            <h1>Code and learn together</h1>
            <p>The all in one, in-browser IDLE</p>
            <div className={classes.actions}>
              <TextInput placeholder="Room id" value={value} onChange={(e) => setValue(e.target.value)} size="lg" required />
              <Button
                className={classes.btn}
                leftIcon={
                  <FiLogIn
                    style={{
                      fontSize: '20px',
                    }}
                  />
                }
                variant="outline"
                size="lg"
                loading={isLoading}
                onClick={() => handleSubmit(1)}
              >
                Join Room
              </Button>
            </div>
            <div className={classes.create}>
              Or{' '}
              <Button style={{ backgroundColor: 'transparent', padding: 0 }} onClick={() => handleSubmit(0)}>
                create
              </Button>{' '}
              your own room.
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <Topics />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

function useTopics() {
  return useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3001/topics');
      return data.topics;
    },
  });
}

function Topics() {
  const { status, data } = useTopics();
  return (
    <div>
      <div className={classes.topicsHeader}>
        <h1>Learn new topics</h1>
        <p>
          If you want to ace the coding interviews, being well-versed in all common data structures and popular problem-solving methods is paramount.
          With many questions spanning more than 3 categories and 3 difficulty levels, we've got you covered.
        </p>
        <Link to="/questions">
          <Button>Explore Questions</Button>
        </Link>
      </div>

      <br />
      <br />
      <br />
      {status === 'loading' ? (
        <CenterLoading height="20vh" width="100vw" />
      ) : status === 'error' ? (
        <h3>Error: Something went wrong</h3>
      ) : (
        <div className={classes.topics}>
          {data.map((t, idx) => (
            <TopicItem key={idx} topic={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function TopicItem({ topic }) {
  return (
    <Link to={`/topic-${topic.topic_name.toLowerCase()}`}>
      <div className={classes.topic}>
        <h3>{topic.topic_name}</h3>
      </div>
    </Link>
  );
}

function HomeNav({ authUser, isLoading, handleSubmit }) {
  return (
    <nav className={classes.nav}>
      <div>
        <Logo src="/assets/dark-logo.png" />
      </div>
      <div className={classes.menu}>
        <Link to="/questions">
          Questions
        </Link>
        {authUser && <Link to="/favorites">
          Favorites
        </Link>}
        <Link to="/topics">
          Topics
        </Link>
        {authUser && <Link to="/progress">
          Progress
        </Link>}
      </div>
      {authUser ? (
        <Profile />
      ) : (
        <Button
          leftIcon={
            <BsGithub
              style={{
                fontSize: '20px',
              }}
            />
          }
          variant="subtle"
          loading={isLoading}
          onClick={() => handleSubmit()}
        >
          Get Started
        </Button>
      )}
    </nav>
  );
}
