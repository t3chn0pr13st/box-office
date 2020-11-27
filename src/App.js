import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navs from './components/Navs';
import Home from './pages/Home';
import Starred from './pages/Starred';

function App() {
  return (
    <div>
      <Navs />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/starred" exact>
          <Starred />
        </Route>
        <Route>
          This is 404 page
        </Route>
      </Switch>
    </div>
  );
}

export default App;
