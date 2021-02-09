import React from 'react';
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import axios from 'axios';
import {Dropdown} from 'semantic-ui-react';
import Cookies from 'universal-cookie';


class Auth extends React.Component {
  componentDidMount() {

  }
  cookies = new Cookies();
  
  
  renderedButton() {
    console.log('PROPS: ', this.props)
    if (this.props.isSignedIn) {
      return (
        <Dropdown text={this.props.userName}>
          <Dropdown.Menu>
            <Dropdown.Item text="Profile" />
            <Dropdown.Item text="Logout" onClick={() => this.logout()}/>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      return (
        <Dropdown text='Login/Sign Up'>
          <Dropdown.Menu>
            <Dropdown.Item text="Login" onClick={() => this.signInClick()} />
            <Dropdown.Item text="Register" />
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  }

  logout = async (event) => {
    await axios.post('/api/logout', {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log('cookies', this.cookies.get('SessionId'))
      this.cookies.remove('SessionId', {path: '/'})
      this.props.signOut()
      console.log('logout', response)
    })


  }
  signInClick = async (event) => {
    await axios.post('/api/login', {
      username: 'randy5235@gmail.com',
      password: 'Password!23'
    }, {
      headers: { 'Content-Type': 'application/json'},
    }).then(response => {
      console.log('firing', response)
      this.props.signIn({userName: response.data.username, userId: response.data.userId})
    });

  }



  render() {

    return (
      <div className="item">
      {this.renderedButton()}
    </div>
    );
  };
}

const mapStateToProps = state => {
  return {isSignedIn: state.auth.isSignedIn, userName: state.auth.userName ,userId: state.auth.userId};
}

export default connect(mapStateToProps, {
  signIn,
  signOut
})(Auth);