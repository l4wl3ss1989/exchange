import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Items from './containers/Items/Items';
import ItemFrom from './containers/ItemFrom/ItemFrom';
import About from './containers/About/About';
// import Auth from './containers/Auth/Auth';
// import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>                        
            <Route path="/item-form" component={ItemFrom} />
            <Route path="/about" component={About} />
            <Route path="/" exact component={Items} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
