import RestConfig from "./rest.config";

const headers = {
  "Content-Type": "application/json",
};

class HttpRequest {
  //Create lobby (roomName)
  static createRoom({ roomName }) {
    return fetch(`${RestConfig.url}/api/Lobby`, {
      method: "POST",
      headers,
      body: `"${roomName}"`,
    });
  }

  //Get Lobby list (id, name)
  static async getRooms() {
    const response = await fetch(`${RestConfig.url}/api/Lobby`, {
      method: "GET",
      headers,
    });
    return response.json();
  }

  //Get Lobby list (id, name)
  static async getRoom({ id }) {
    const response = await fetch(`${RestConfig.url}/api/Lobby/${id}`, {
      method: "GET",
      headers,
    });
    return response.json();
  }
}

export default HttpRequest;
