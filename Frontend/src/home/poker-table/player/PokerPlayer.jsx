import React from 'react';

function PokerPlayer({ player, showVote }) {
    return (
        <div className="poker-player__container">
            <div className="poker-player__avatar"></div>
            <div className="poker-player__name">{player.name}</div>
        </div>
    )
}

export default PokerPlayer;
