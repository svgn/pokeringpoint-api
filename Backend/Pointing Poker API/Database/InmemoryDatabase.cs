using PointingPokerAPI.Models;
using System.Collections.Generic;
using PointingPokerAPI.Enums;

//TODO: USE REAL DATABASE
namespace PointingPokerAPI.Database
{
    public class InmemoryDatabase
    {
        private int lobbyIdCount;

        public InmemoryDatabase()
        {
            this.Lobbies = new List<Lobby>();
            this.lobbyIdCount = 1;
        }

        public List<Lobby> Lobbies { get; }

        public Lobby AddLobby(Lobby lobby)
        {
            lobby.Id = lobbyIdCount++;
            Lobbies.Add(lobby);

            return lobby;
        }
    }
}
