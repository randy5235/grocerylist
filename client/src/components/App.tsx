import React from 'react';
import Header from './Header';

import axios from 'axios';
class App extends React.Component {
  state = {
    isLoggedIn: null,
    userName: null
  }
  componentDidMount() {

    // const getLists = async() => {
    //   const response = await axios.get('/api/lists', {
    //     headers: {'Content-Type': 'application/json'},
    //     withCredentials: true
    //   }).then(resonse => console.log(`response: `, resonse))
    // }

    // getCookie().then(() => getLists());
    // // getLists();
  }

  render() {
    return (
      <div className="ui container">
        <Header isLoggedIn={this.state.isLoggedIn} userName={this.state.userName}/>
        App
      </div>
    );
  }
};

export default App;
