import React from 'react';

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import Welcome from './welcome_page/body';
import SpacesIndex from './welcome_page/spaces_index/body';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/my_spaces" component={SpacesIndex} />
    </Switch>
  </div>
);

export default App;
