import React from 'react';

export type Item = {
  id: number;
  text: string;
};

export type Props = {
  items: Item[];
};

const List: React.FC<Props> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
};

export default List;