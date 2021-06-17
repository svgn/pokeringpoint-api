using PointingPokerAPI.Enums;
using PointingPokerAPI.Models;
using System.Collections.Generic;

namespace PointingPokerAPI.ViewModels
{
    public class LobbyViewModel
    {
        public int Id { get; set; }
        public IList<User> Users { get; set; }
        public IList<CardDeckEnum> Cards { get; set; }
        public string Name { get; set; }
        public bool ShowVotes { get; set; }
    }
}
