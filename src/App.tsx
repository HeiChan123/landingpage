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
import { RouteProps } from "react-router";
import { AppState } from "./AppState";

import "./antd-theme.less";
import 'antd/dist/antd.css';

interface PrivateRouteProps extends RouteProps {
    loggedIn: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ loggedIn, children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedIn ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

const App = observer(({ appState }: { appState: AppState }) => {

    return (
        <Switch>
            <Route exact path="/">
                <Landingpage appState={appState} />
            </Route>
            { /* Authenticated routes are nested under `/bo`, and handled by the main component */}
            <PrivateRoute loggedIn={appState.isLoggedIn()} path="/lobby">
                <Lobby appState={appState} />
            </PrivateRoute>

            { /* Something else?! */}
            <Route path="*">
                <p>Page not found :(</p>
            </Route>
        </Switch>
    );
});

export default App;
