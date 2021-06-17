using Microsoft.AspNetCore.SignalR;
using PointingPokerAPI.Enums;
using PointingPokerAPI.Models;
using PointingPokerAPI.Services.Contracts;
using PointingPokerAPI.Mapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace PointingPokerAPI.Hubs
{
    public class LobbyHub : Hub
    {
        private readonly ILobbyService lobbyService;
        private readonly IUserService userService;

        public LobbyHub(ILobbyService lobbyService, IUserService userService)
        {
            this.lobbyService = lobbyService;
            this.userService = userService;
        }

        public async Task JoinLobby(int lobbyId, string userName, UserTypeEnum userType)
        {
            var user = userService.CreateUser(userName, userType, lobbyId, Context.ConnectionId);
            await Groups.AddToGroupAsync(Context.ConnectionId, lobbyId.ToString());

            await Clients.Caller.SendAsync("JoinLobby", user.ToViewModel());
            await UpdateClientGroup(lobbyId);
        }

        public async Task Vote(int lobbyId, CardDeckEnum card)
        {
            lobbyService.Vote(lobbyId, Context.ConnectionId, card);

            await UpdateClientGroup(lobbyId);
        }

        public async Task ClearVote(int lobbyId)
        {
            lobbyService.ClearVotes(lobbyId);

            await UpdateClientGroup(lobbyId);
        }
        
        public async override Task OnDisconnectedAsync(Exception exception)
        {
            int? lobbyId = lobbyService.GetLobbyId(Context.ConnectionId);
            if (lobbyId != null)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, lobbyId.Value.ToString());
                lobbyService.RemoveUser(Context.ConnectionId, lobbyId.Value);

                await UpdateClientGroup(lobbyId.Value);
            }

            await base.OnDisconnectedAsync(exception);
        }

        public async Task LeaveLobby(int lobbyId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, lobbyId.ToString());
            lobbyService.RemoveUser(Context.ConnectionId, lobbyId);

            await UpdateClientGroup(lobbyId);
        }

        public async Task ShowVote(int lobbyId)
        {
            lobbyService.ShowVotes(lobbyId);

            await UpdateClientGroup(lobbyId);
        }

        private async Task UpdateClientGroup(int lobbyId)
        {
            await Clients.Group(lobbyId.ToString()).SendAsync("UpdateLobby", lobbyService.GetLobby(lobbyId).ToViewModel());
        }
    }
}
