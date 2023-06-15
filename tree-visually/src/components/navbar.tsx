import { useContext } from 'react';

import ToggleSwitch from './toggleSwitch';

import { CodeContext } from '../App';

// styles
import classes from './navbar.module.css';

export default function Navbar() {
  const { viewData, setViewData } = useContext(CodeContext);

  const setDarkSide = (value: boolean) => {
    document.body.style.backgroundColor = value ? '#44444c' : '#fbfbfb';
    setViewData((viewData: any) => ({ ...viewData, darkSide: value }));
  };

  return (
    <div className={classes.wrapper}>
      <a href="/" className={classes.logo}>
        <h1>🌳Tree Visually</h1>
      </a>
      <div className="btn-wrapper">
        Dark Side
        <ToggleSwitch checked={viewData['darkSide'] ?? false} onChange={setDarkSide} />
      </div>
    </div>
  );
}
