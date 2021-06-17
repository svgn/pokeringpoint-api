using PointingPokerAPI.Database;
using PointingPokerAPI.Enums;
using PointingPokerAPI.Models;
using PointingPokerAPI.Services.Contracts;
using System.Collections.Generic;
using System.Linq;


namespace PointingPokerAPI.Services
{
    public class LobbyService : ILobbyService
    {
        private readonly InmemoryDatabase database;

        public LobbyService(InmemoryDatabase database)
        {
            this.database = database;
        }

        public void AddUser(User user, int lobbyId)
        {
            Lobby lobby = GetLobby(lobbyId);

            lobby.Users.Add(user);
        }

        public int? GetLobbyId(string userConnectionId)
        {
            return database.Lobbies.FirstOrDefault(x => x.Users.Any(y => y.ConnectionId == userConnectionId))?.Id;
        }

        public void ClearVotes(int lobbyId)
        {
            Lobby lobby = GetLobby(lobbyId);
            lobby.ShowVotes = false;
            foreach (User user in lobby.Users)
            {
                user.Vote = null;
            }
        }

        public Lobby CreateLobby(string name)
        {
            Lobby lobby = new Lobby()
            {
                Name = name
            };

            return database.AddLobby(lobby);
        }

        public IList<Lobby> GetAll()
        {
            return database.Lobbies;
        }

        public Lobby GetLobby(int id)
        {
            return database.Lobbies.FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<User> GetUsers(int lobbyId)
        {
            return GetLobby(lobbyId).Users.OrderBy(x => x.Name);
        }

        public void RemoveUser(string connectionId, int lobbyId)
        {
            Lobby lobby = GetLobby(lobbyId);
            User user = lobby.Users.FirstOrDefault(x => x.ConnectionId == connectionId);

            lobby.Users.Remove(user);
        }

        public void ShowVotes(int lobbyId)
        {
            Lobby lobby = GetLobby(lobbyId);
            lobby.ShowVotes = true;
        }

        public void Vote(int lobbyId, string connectionId, CardDeckEnum card)
        {
            Lobby lobby = GetLobby(lobbyId);
            User user = lobby.Users.FirstOrDefault(x => x.ConnectionId == connectionId);

            user.Vote = card;
        }
    }
}
