import React from 'react';
import logo from './logo.svg';
import './App.css';
import { observer } from "mobx-react";
import Landingpage from "./prelogin/Landingpage"
import Lobby from "./postlogin/Lobby"
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import "./antd-theme.less";
import 'antd/dist/antd.css';

const App = observer(() => {

  return (
      <Switch>
          <Route exact path="/">
              <Landingpage />
          </Route>
          <Route path="/lobby">
              <Lobby />
          </Route>
          { /* Authenticated routes are nested under `/bo`, and handled by the main component */}
          {/* <PrivateRoute loggedIn={appState.isLoggedIn()} path="/bo/*">
              <BackofficeUI appState={appState} />
          </PrivateRoute> */}

          { /* Something else?! */}
          <Route path="*">
              <p>Page not found :(</p>
          </Route>
      </Switch>
  );
});

export default App;
