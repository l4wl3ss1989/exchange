import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Items from './containers/Items/Items';
import ItemForm from './containers/ItemForm/ItemForm';
import ItemUser from './containers/Items/ItemsUser';
import About from './containers/About/About';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>                        
            <Route path="/item/:id" exact component={ItemUser} />
            <Route path="/item-form" exact component={ItemForm} />
            <Route path="/about" exact component={About} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/" exact component={Items} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
