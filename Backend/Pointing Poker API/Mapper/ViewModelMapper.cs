using PointingPokerAPI.Models;
using PointingPokerAPI.ViewModels;

namespace PointingPokerAPI.Mapper
{
    public static class ViewModelMapper
    {
        public static UserViewModel ToViewModel(this User user)
        {
            UserViewModel model = new UserViewModel()
            {
                Name = user.Name,
                UserType = user.UserType,
                Vote = user.Vote,
                ConnectionId = user.ConnectionId,
                LobbyId = user.LobbyId
            };

            return model;
        }

        public static LobbyViewModel ToViewModel(this Lobby lobby)
        {
            LobbyViewModel model = new LobbyViewModel()
            {
                Id = lobby.Id,
                Name = lobby.Name,
                Cards = lobby.Cards,
                Users = lobby.Users,
                ShowVotes = lobby.ShowVotes
            };

            return model;
        }
    }
}
