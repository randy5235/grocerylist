
import { useState } from 'react';
import * as styles from '../styles/LoginMenuDropDown.module.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function LoginMenuDropDown() {
  const [isLoginShowing, setIsLoginShowing] = useState(false);
  const [isRegisterShowing, setIsRegisterShowing] = useState(false);
  return (
    <div className={styles.dropDown}>
      <ul>
        <li>
          <a href="/login" onClick={(event) => { event.preventDefault(); setIsLoginShowing(!isLoginShowing)}} className="dropdown-item">Login</a>
          {isLoginShowing && <LoginForm />}
        </li>
        <li>
          <a href="/register" onClick={(event) => { event.preventDefault(); setIsRegisterShowing(!isRegisterShowing)}} className="dropdown-item">Register</a>
          {isRegisterShowing && <RegisterForm />}
        </li>
      </ul>
    </div>
  );
}