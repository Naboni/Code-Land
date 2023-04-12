import React from 'react';

type Props = {
  value: string;
  onChange: (newValue: string) => void;
};

const Input: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return <input type="text" value={value} onChange={handleChange} />;
};

export default Input;