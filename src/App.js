import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        This is home page
      </Route>
      <Route path="/starred" exact>
        This is starred
      </Route>
      <Route>
        This is 404 page
      </Route>
    </Switch>
  );
}

export default App;
