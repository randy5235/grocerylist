import { useState, useEffect, useContext } from 'react';
import { StoreContext } from './App';
import * as styles from '../styles/LoginForm.module.css';


export default function LoginForm(props) {

  interface ICredentials {
    username: string | undefined;
    password: string | undefined;
  }
  const {open, setOpen} = props;
  const {store, setStore} = useContext(StoreContext);
  const [username, setUsername] = useState<string|undefined>(undefined);
  const [password, setPassword] = useState<string|undefined>(undefined);

  const [validated, setValidated] = useState(!(username && password));

  useEffect(() => {
    setValidated(!(username && password));
  }, [username, password])

  const handleSubmit = async () => {
    try {
      const login = await fetch('http://0.0.0.0:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      }).then(response => response.json());

      let value = {auth:{isSignedIn: true, ...login}};
      setStore(value);
      setOpen(!open);
      
      console.log("username", username, password, login);
    } catch (error) {
      console.error(error);
    }
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