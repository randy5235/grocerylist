import { useState } from 'react';
import * as styles from '../styles/LoginMenu.module.css';
import LoginMenuDropDown from './LoginMenuDropDown';


export default function LoginMenu() {
  
  const [user, setUser] = useState(undefined);
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.loginMenu}>
     <button onClick={() => setOpen(!open)}> Sign In / Sign Up </button>
     { open && <LoginMenuDropDown /> }
    </div>
  );
}
