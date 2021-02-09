import React from 'react';  

import Auth from './Auth';

const Header = props => {
  return (
    <div className="ui secondary pointing menu">
      <div className="item">
        <h1>
          Welcome to the GroceryList app!
        </h1>
      </div>
      <div className="right menu">
      
          <Auth />

      </div>
    </div>

  );
};

export default Header;