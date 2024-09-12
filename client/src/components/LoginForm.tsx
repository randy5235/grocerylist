import { useState, useEffect } from 'react';
import * as styles from '../styles/LoginForm.module.css';

export default function LoginForm() {

  interface ICredentials {
    username: string | undefined;
    password: string | undefined;
  }

  const [username, setUsername] = useState<string|undefined>(undefined);
  const [password, setPassword] = useState<string|undefined>(undefined);

  const [validated, setValidated] = useState(!(username && password));

  useEffect(() => {
    setValidated(!(username && password));
  }, [username, password])

  const handleSubmit = () => {
    // const username = document.querySelector('input[name="username"]')?.value
    // const password = document.querySelector('input[name="password"]')?.value
    console.log("username", username, password);
  }



  return (
    <div className={styles.LoginForm}>
      <input name="username" type="text" placeholder='Username' onChange={(event)=> setUsername(event.target.value)}/>
      <br />
      <input name="password" type="password" placeholder='Password'  onChange={(event)=> setPassword(event.target.value)}/>
      <br />
      <button disabled={validated} onClick={() => handleSubmit()}>Log In</button>
      <button>Forgot Password</button>
    </div>
  );
}