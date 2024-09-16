
import { useState, useContext } from 'react';
import * as styles from '../styles/LoginMenuDropDown.module.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { StoreContext } from './App';

export default function LoginMenuDropDown(props) {
  const {open, setOpen} = props;
  const [isLoginShowing, setIsLoginShowing] = useState(false);
  const [isRegisterShowing, setIsRegisterShowing] = useState(false);
  const {store, setStore} = useContext(StoreContext);
  const isLoggedIn = store.auth.isSignedIn;
  return (
    <div className={styles.dropDown}>
      {!isLoggedIn &&
      <ul>
        <li>
          <a href="/login" onClick={(event) => { event.preventDefault(); setIsLoginShowing(!isLoginShowing)}} className="dropdown-item">Login</a>
          {isLoginShowing && <LoginForm setOpen={setOpen} open={open} />}
        </li>
       
        <li>
          <a href="/register" onClick={(event) => { event.preventDefault(); setIsRegisterShowing(!isRegisterShowing)}} className="dropdown-item">Register</a>
          {isRegisterShowing && <RegisterForm setOpen={setOpen} open={open} />}
        </li>
      </ul>
      }
      {isLoggedIn && 
        <ul>
          <a href="/logout" onClick={(event) => { event.preventDefault(); setStore({auth: {isSignedIn: false, userName: '', userId: ''}}); setOpen(!open)}} className="dropdown-item">Logout</a>
        </ul>
      }
    </div>
  );
}