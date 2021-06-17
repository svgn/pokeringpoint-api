import React from 'react';
import PokerPlayer from './player/PokerPlayer';

function PokerTable({ players, showVotes, user }) {
    const createPlayerDistribution = () => {
        let distribution = {
            top: [],
            bottom: [],
            left: [],
            right: []
        };
        players.forEach((item, index) => {
            if (index % 4 === 0) {
                distribution.bottom.push(item);
            } else if (index % 4 === 1) {
                distribution.left.push(item);
            } else if (index % 4 === 2) {
                distribution.top.push(item);
            } else {
                distribution.right.push(item);
            }
        });

        return distribution;
    }

    const d = createPlayerDistribution(players);

    return (
        <div className="table-wrapper">
            <div className="table-container">
                <div className="table-middle">
                    <div className="table-middle__core"></div>
                </div>
                <div className="table-top">{ d.top.map(p => (<PokerPlayer key={p.connectionId} player={p} showVote={true}></PokerPlayer>)) }</div>
                <div className="table-right">{ d.right.map(p => (<PokerPlayer key={p.connectionId} player={p} showVote={true}></PokerPlayer>)) }</div>
                <div className="table-bottom">{ d.bottom.map(p => (<PokerPlayer key={p.connectionId} player={p} showVote={true}></PokerPlayer>)) }</div>
                <div className="table-left">{ d.left.map(p => (<PokerPlayer key={p.connectionId} player={p} showVote={true}></PokerPlayer>)) }</div>
            </div>
        </div>
    )
}

export default PokerTable;
