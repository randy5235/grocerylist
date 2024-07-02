import React from 'react';
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import Cookies from 'universal-cookie';


const cookies = new Cookies();
let isSignedIn = false;

const Auth = (props: any) => {



  console.log('AUTH PROPS : ', props);
  
    if (isSignedIn) {

      return (
        <Dropdown text={props?.value.auth.userName}>
          <Dropdown.Menu>
            <Dropdown.Item text="Profile" />
            <Dropdown.Item text="Logout" onClick={(event) => logout(event)} />
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      return (
        <Dropdown text='Login/Sign Up'>
          <Dropdown.Menu>
            <Dropdown.Item text="Login" onClick={(event) => signInClick(event, props)} />
            <Dropdown.Item text="Register" />
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  }

  // @ts-ignore
  const logout = async (event) => {
    await axios.post('/api/logout', {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log('cookies', cookies.get('SessionId'));
      cookies.remove('SessionId', { path: '/' });
      signOut();
      console.log('logout', response);
    });


  };
  // @ts-ignore
  const signInClick = async (event, props) => {
    console.log('Sign in props:', props);
    await axios.post('/api/user/login', {
      username: 'randy+3@gmail.com',
      password: 'Password!23'
    }, {
      headers: { 'Content-Type': 'application/json' },
    }).then(response => {
      console.log('firing', response);
      signIn({ userName: response.data.username, userId: response.data.userId });
      isSignedIn = true;
      props.value.auth.userName = response.data.username;
      props.value.auth.isSignedIn = true;
      
      
    });

  };

// @ts-ignore
// const mapStateToProps = state => {
//   return { isSignedIn: state.auth.isSignedIn, userName: state.auth.userName, userId: state.auth.userId };
// };

export default Auth;