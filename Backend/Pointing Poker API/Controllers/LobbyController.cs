using Microsoft.AspNetCore.Mvc;
using PointingPokerAPI.Services;
using PointingPokerAPI.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PointingPokerAPI.Mapper;
using PointingPokerAPI.ViewModels;
using PointingPokerAPI.Models;

namespace PointingPokerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LobbyController : ControllerBase
    {
        private readonly ILobbyService lobbyService;

        public LobbyController(ILobbyService lobbyService)
        {
            this.lobbyService = lobbyService;
        }

        [HttpGet()]
        public IActionResult GetAll()
        {
            IList<LobbyViewModel> lobbies = this.lobbyService.GetAll().Select(x => x.ToViewModel()).ToList();

            return Ok(lobbies);
        }

        [HttpGet("{id}")]
        public IActionResult GetLobby(int id)
        {
            LobbyViewModel lobby = this.lobbyService.GetLobby(id).ToViewModel();

            return Ok(lobby);
        }

        [HttpPost()]
        public IActionResult CreateLobby([FromBody]string name)
        {
            return Ok(this.lobbyService.CreateLobby(name));
        }
    }
}
