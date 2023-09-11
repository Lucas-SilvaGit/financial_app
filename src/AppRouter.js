import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Accounts from './components/Accounts';
import Categories from './components/Categories';
import Entries from './components/Entries';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/accounts" exact component={Accounts} />
        <Route path="/categories" exact component={Categories} />
        <Route path="/entries" exact component={Entries} />
      </Switch>
    </Router>
  );
};

export default AppRouter;