import "./App.css";
import React, { useCallback, useEffect, useState } from 'react';
import Login from "./login/Login";
import { Home } from "./home/home.jsx";
import HttpRequest from "./rest/httpRequest";
import ConnectionHub from "./rest/connectionHub";

import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

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
  const [user, setUser] = useState();

  const joinRoom = useCallback(async ({ username, isObserver, roomId }) => {
    const room = await HttpRequest.getRoom({ id: roomId });
    const userType = isObserver ? 0 : 1;
    const user = ConnectionHub.joinLobby(room.id, username, userType);
  }, []);
  useEffect(() => {
    ConnectionHub.subscribeForJoinLobby((user) => { setUser(user); });
  })

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {!user ? (
          <Login
            onJoinRoom={(...args) => joinRoom(...args)}
          />
        ) : (
          <Home user={user}/>
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
