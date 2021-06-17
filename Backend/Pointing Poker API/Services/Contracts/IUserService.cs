using PointingPokerAPI.Enums;
using PointingPokerAPI.Models;

namespace PointingPokerAPI.Services.Contracts
{
    public interface IUserService
    {
        public User CreateUser(string name, UserTypeEnum type, int lobbyId, string connectionId);
    }
}
