import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import List, { Item } from './components/List';

function App() {
  const handleClick = () => {
    console.log("clicked")
  }
  const [value, setValue] = React.useState<string>('')
  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  const items: Item[] = [
    {id: 1, text: 'item 1'},
    {id: 2, text: 'item 2'},
    {id: 3, text: 'item 3'},
    {id: 4, text: 'item 4'},
  ]
  return (
    <div className="App">
      <Button children='Click Me' onClick={handleClick}/>
      <Input value={value} onChange={(e)=>handleChange(e)}/>
      <List items={items}/>
    </div>
  );
}

export default App;
