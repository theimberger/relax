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
import AddSpace from './welcome_page/spaces_index/add_space/body';
import JoinSpace from './welcome_page/spaces_index/join_space/body';

import SpacePage from './space_page/body_container';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/my_spaces" component={SpacesIndex} />
      <Route exact path="/my_spaces/add" component={AddSpace} />
      <Route exact path="/my_spaces/join" component={JoinSpace} />
      <Route path="/spaces/:id" component={SpacePage} />
    </Switch>
  </div>
);

export default App;
