using System;
using System.Linq;
using System.Collections.Generic;
using PointingPokerAPI.Enums;

namespace PointingPokerAPI.Models
{
    public class Lobby
    {
        public Lobby()
        {
            this.Cards = Enum.GetValues(typeof(CardDeckEnum)).Cast<CardDeckEnum>().ToList();
            this.Users = new List<User>();
        }

        public int Id { get; set; }
        public IList<User> Users;
        public IList<CardDeckEnum> Cards;
        public bool ShowVotes { get; set; }
        public string Name { get; set; }
    }
}
