import React from 'react';  
// import { useContext } from 'react';
// import Auth from './Auth';

const Header = (props: any) => {
  // const store = useContext(props.store);
  return (
    <div className="ui secondary pointing menu">
      <div className="item">
        <h1>
          Welcome to the GroceryList app!
        </h1>
      </div>
      <div className="right menu">
      
          {/* <Auth store={store} /> */}

      </div>
    </div>

  );
};

export default Header;