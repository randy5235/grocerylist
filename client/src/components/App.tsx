import React from 'react';
import Header from './Header';
import NavigationPane from './NavigationPane';
import LoginMenu from './LoginMenu';

const StoreContext = React.createContext({
  auth: {
    isSignedIn: false,
    userName: 'test',
    userId: ''
  }
});

// import axios from 'axios';
// class App extends React.Component {
//   state = {
//     isLoggedIn: null,
//     userName: null
//   }
//   componentDidMount() {

//     // const getLists = async() => {
//     //   const response = await axios.get('/api/lists', {
//     //     headers: {'Content-Type': 'application/json'},
//     //     withCredentials: true
//     //   }).then(resonse => console.log(`response: `, resonse))
//     // }

//     // getCookie().then(() => getLists());
//     // // getLists();
//   }

//   render() {
//     return (
//      
//     );
//   }
// };

function App() {
  const [store, setStore]  = React.useState({
    auth: {
      isSignedIn: false,
      userName: '',
      userId: ''
    }
  });
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  // const [userName, setUserName] = React.useState('')

  return (
    <StoreContext.Provider value={store}>
       <div className="ui container">
        {/* <Header className="navigation" isLoggedIn={store.auth.isSignedIn} userName={store.auth.userName}/> */}
        <div className='navigation'>
          <NavigationPane />
          <LoginMenu />
      </div>
       </div>
    </StoreContext.Provider>
  );
}


export default App;

export { StoreContext };
