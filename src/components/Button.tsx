import React from 'react';

type Props = {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({ onClick, disabled = false, children }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;