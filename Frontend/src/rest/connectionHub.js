import RestConfig from "./rest.config";
import * as signalR from "@microsoft/signalr"

class ConnectionHub {
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${RestConfig.url}/lobbyHub`)
      .build();
    this.start();
  }

  start() {
    try {
      this.connection.start({ withCredentials: false });
    } catch (err) {
      console.log(err);
    }
  }

  subscribeForUpdateLobby(lobbyHub, cb) {
    this.connection.on("UpdateLobby", (lobby) => {
       cb(lobby);
    });
  }
  subscribeForJoinLobby(cb) {
    this.connection.on("JoinLobby", (user) => {
      	cb(user)
      });
  }

  joinLobby(lobbyId, userName, userType) {
    this.connection.invoke("JoinLobby", lobbyId, userName, userType);
  }

  vote(lobbyId, cardId) {
    this.connection.invoke("Vote", lobbyId, cardId);
  }

  clearVote(lobbyId) {
    this.connection.invoke("ClearVote", lobbyId);
  }

  leaveLobby(lobbyId) {
    this.connection.invoke("LeaveLobby", lobbyId);
  }

  showVote(lobbyId) {
    this.connection.invoke("ShowVote", lobbyId);
  }
}

export default ConnectionHub = new ConnectionHub();
