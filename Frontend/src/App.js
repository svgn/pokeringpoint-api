import "./App.css";
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./login/Login";
import { Home } from "./home/home.jsx";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { localStorageService } from "./storage/local-storage.service";
import blue from "@material-ui/core/colors/blue";
import ConnectionHub from './rest/connectionHub.js';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: blue[50],
    },
  },
});

function App() {
  const user = localStorageService.getLoggedUser();

  window.addEventListener('beforeunload', () => {
    if (user && user.lobbyId) {
      ConnectionHub.leaveLobby(user.lobbyId);
    }
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/room/:roomId">
              <Home user={user} />
            </Route>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
