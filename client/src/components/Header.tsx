import React from 'react';  
// import { useContext } from 'react';
import Auth from './Auth';
import { StoreContext } from './App'

const Header = (props: any) => {
  // console.log(`props: `, props);
  const store = React.useContext(StoreContext);
  return (
    <div className="ui secondary pointing menu">
      <div className="item">
        <h1>
          Welcome to the GroceryList app!
        </h1>
      </div>
      <div className="right menu">
      
          <Auth value={store} />

      </div>
    </div>

  );
};

export default Header;