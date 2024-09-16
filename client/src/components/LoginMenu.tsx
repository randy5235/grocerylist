import { useState, useContext } from 'react';
import * as styles from '../styles/LoginMenu.module.css';
import LoginMenuDropDown from './LoginMenuDropDown';
import { StoreContext } from './App';


export default function LoginMenu() {
  
  const [user, setUser] = useState(undefined);
  const [open, setOpen] = useState(false);
  const {store} = useContext(StoreContext);
  console.log(`store From LoginMenu: `, store);
  const UserName = store?.auth?.isSignedIn ? store.auth.username : 'Login';
  return (
   
        <div className={styles.loginMenu}>
        <button onClick={() => setOpen(!open)}> {UserName} </button>
        { open && <LoginMenuDropDown open={open} setOpen={setOpen }/> }
        </div>
   
  );
}
