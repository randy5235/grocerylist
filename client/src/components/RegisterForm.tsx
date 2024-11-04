import { useState, useEffect, useContext} from 'react';
import * as styles from '../styles/RegisterForm.module.css';
import { StoreContext, setAuth } from './App';

export default function RegisterForm(props) {

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
    const password1 = document.querySelector('input[name="password1"]')?.value;
    const password2 = document.querySelector('input[name="password2"]')?.value;
    if (password1 === password2) {
    setValidated(!(username && password));
    }
  }, [username, password])

  const handleSubmit = async () => {
    try {
      const register = await fetch('http://0.0.0.0/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      }).then(response => response.json());

      let value = {auth:{isSignedIn: true, ...register}};
      setStore(value);
      setOpen(!open);
      
      console.log("username", username, password, register);
    } catch (error) {
      console.error(error);
    }
    
  }



  return (
    <div className={styles.RegisterForm}>
      <input name="username" type="text" placeholder='Username' onChange={(event)=> setUsername(event.target.value)}/>
      <br />
      <input name="password1" type="password" placeholder='Password'  onChange={(event)=> setPassword(event.target.value)}/>
      <br />
      <input name="password2" type="password" placeholder='Password'  onChange={(event)=> setPassword(event.target.value)}/>
      <br />
      <button disabled={validated} onClick={() => handleSubmit()}>Log In</button>
    </div>
  );
}