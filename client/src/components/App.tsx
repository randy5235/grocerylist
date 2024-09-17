import React, {useState, createContext} from 'react';
import Header from './Header';
import NavigationPane from './NavigationPane';
import LoginMenu from './LoginMenu';
import WelcomePage from './WelcomePage';
import ListDashboard from './ListDashboard';

interface IStore {
  auth: {
    isSignedIn: boolean,
    userName: string,
    userId: string
  }
}
  // setStore: (state: any, store: any) => void
// }

const StoreContext = createContext<any | null>(null);
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

export function setAuth(state: any, store: any) {
  console.log("is this firing?")
  store.auth.isSignedIn = true;
  store.auth.userName = state.userName;
  store.auth.userId = state.userId;
  }

  const getAuth = async () => await fetch('http://0.0.0.0:5000/api/auth', {
    method: 'GET',
    credentials: 'include',
  }).then(response => {
    const result = response.json();
    console.log('response: ', result);
    return result;
  });

function App() {

  const auth = getAuth();
  if (auth) {
    console.log('auth: ', auth);
  }
  const [store, setStore]: [store:any, setStore: any]  = useState({
      auth: {
        isSignedIn: false,
      userName: '',
      userId: '',
      },
      setStore: (state: any, store: any) => {
        console.log("are we getting here?")
        setAuth(state, store);
      }
  });

   
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  // const [userName, setUserName] = React.useState('')

  return (
    <StoreContext.Provider value={{store, setStore}}>
       <div className="ui container">
        {/* <Header className="navigation" isLoggedIn={store.auth.isSignedIn} userName={store.auth.userName}/> */}
        <div className='navigation'>
          <NavigationPane />
          <LoginMenu />
      </div>
      {store?.auth.isSignedIn 
        ? <ListDashboard />
        : <WelcomePage /> }
       </div>
    </StoreContext.Provider>
  );
}


export default App;

export { StoreContext };

