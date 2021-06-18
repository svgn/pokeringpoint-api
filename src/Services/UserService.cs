using PointingPokerAPI.Enums;
using PointingPokerAPI.Models;
using PointingPokerAPI.Services.Contracts;

namespace PointingPokerAPI.Services
{
    public class UserService : IUserService
    {
        private readonly ILobbyService lobbyService;

        public UserService(ILobbyService lobbyService)
        {
            this.lobbyService = lobbyService;
        }

        public User CreateUser(string name, UserTypeEnum type, int lobbyId, string connectionId)
        {
            User user = new User()
            {
                Name = name,
                UserType = type,
                ConnectionId = connectionId,
                LobbyId = lobbyId
            };

            lobbyService.AddUser(user, lobbyId);

            return user;
        }
    }
}
