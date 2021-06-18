using PointingPokerAPI.Enums;

namespace PointingPokerAPI.Models
{
    public class User
    {
        public string Name { get; set; }
        //public bool HasVoted { get; set; }
        public CardDeckEnum? Vote { get; set; }
        public UserTypeEnum UserType { get; set; }
        public string ConnectionId { get; set; }
        public int LobbyId { get; set; }
    }
}
