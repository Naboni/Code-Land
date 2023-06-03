import React from 'react';

import Logo from './logo';
import Profile from './profile';

import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const style = {
  height: '55px',
  padding: '0 10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const menu = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px"
}

export default function SimpleNav() {
  const { authUser } = useAuth();

  return (
    <nav style={style}>
      <Logo src="/assets/dark-logo.png" />
      <div style={menu}>
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
      {authUser && <Profile />}
    </nav>
  );
}
