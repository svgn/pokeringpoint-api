import RestConfig from "./rest.config";
import * as signalR from "@microsoft/signalr"

class ConnectionHub {
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${RestConfig.url}/lobbyHub`)
      .withAutomaticReconnect([])
      .build();

    this.startPromise = this.start();
  }

  async start() {
    try {
        return await this.connection.start();
    } catch (err) {
        console.log(err);
    }
  }

  async ensureConnectionStarted() {
    if (!this.connection.connectionStarted) {
      await this.startPromise;
    }
  }

  subscribeForUpdateLobby(lobbyHub, cb) {
    this.connection.on("UpdateLobby", (lobby) => {
       cb(lobby);
    });
  }

  subscribeForJoinLobby(cb) {
    this.connection.on("JoinLobby", (user) => {
      	cb(user);
      });
  }

  async joinLobby(lobbyId, userName, userType) {
    await this.ensureConnectionStarted();
    this.connection.invoke("JoinLobby", lobbyId, userName, userType);
  }

  async vote(lobbyId, cardId) {
    await this.ensureConnectionStarted();
    this.connection.invoke("Vote", lobbyId, cardId);
  }

  async clearVote(lobbyId) {
    await this.ensureConnectionStarted();
    this.connection.invoke("ClearVote", lobbyId);
  }

  async leaveLobby(lobbyId) {
    await this.ensureConnectionStarted();
    this.connection.invoke("LeaveLobby", lobbyId);
  }

  async showVote(lobbyId) {
    await this.ensureConnectionStarted();
    this.connection.invoke("ShowVote", lobbyId);
  }
}

export default ConnectionHub = new ConnectionHub();
