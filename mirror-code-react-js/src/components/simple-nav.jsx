import React from 'react';

import Logo from './logo';
import Profile from './profile';

import { useAuth } from '../hooks/useAuth';

const style = {
  height: '55px',
  padding: '0 10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export default function SimpleNav() {
  const { authUser } = useAuth();

  return (
    <nav style={style}>
      <Logo src="/assets/dark-logo.png" />
      {authUser && <Profile />}
    </nav>
  );
}
