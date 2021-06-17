using PointingPokerAPI.Models;
using PointingPokerAPI.Enums;
using System.Collections.Generic;

namespace PointingPokerAPI.Services.Contracts
{
    public interface ILobbyService
    {
        public Lobby GetLobby(int id);
        public IList<Lobby> GetAll();
        public Lobby CreateLobby(string name);
        public void AddUser(User user, int lobbyId);
        public void Vote(int lobbyId, string connectionId, CardDeckEnum card);
        public void RemoveUser(string connectionId, int lobbyId);
        public void ClearVotes(int lobbyId);
        IEnumerable<User> GetUsers(int lobbyId);
        public void ShowVotes(int lobbyId);
        int? GetLobbyId(string userConnectionId);
    }
}
