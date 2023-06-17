// styles
import classes from './navbar.module.css';

export default function BasicNavbar() {
  return (
    <div className={classes.wrapper}>
      <a href="/" className={classes.logo}>
        <h1>🌳Tree Visually</h1>
      </a>
    </div>
  );
}
