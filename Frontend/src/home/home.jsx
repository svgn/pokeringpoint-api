import { ListItem } from './list-item/list-item.jsx';
import { useReducer } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { localStorageService } from '../storage/local-storage.service';
import { Redirect } from 'react-router-dom';
import HttpRequest from '../rest/httpRequest';
import ConnectionHub from '../rest/connectionHub.js';
import Cards from "./cards/Cards";
import {VotesStaticList} from "./votes-list";

const initialState = {
    showVotes: false,
    userList: [],
    cards: []
};

// const initialState = {
//     showVotesActive: false,
//     userList: [
//         { id: 1, name: 'person1', vote: 7 },
//         { id: 2, name: 'koev', vote: 2 },
//         { id: 3, name: 'person3', vote: 5 },
//         { id: 4, name: 'person4', vote: 1 },
//     ]
// };

function reducer(state = {}, action = {}) {
    switch (action.type) {
        case 'vote':
            return {
                ...state,
                userList: state.userList.map(user => (user.connectionId === action.payload.connectionId ? { ...user, vote: action.payload.vote } : user))
            };
        case 'showVotes':
            return { ...state, showVotes: true };
        case 'clearVotes':
            return {
                ...state,
                showVotes: false,
                userList: state.userList.map(user => ({ ...user, vote: null }))
            };
        case 'update':
            return { ...action.payload };
        default:
            throw new Error();
    }
}

export function Home() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [user, setUser] = useState(localStorageService.getLoggedUser());
    const params = useParams();
    const roomId = parseInt(params.roomId);

    useEffect(() => {
        ConnectionHub.subscribeForUpdateLobby(roomId, (lobby) => {
            const mappedLobby = { ...lobby, userList: lobby.users || [] };
            dispatch({ type: 'update', payload: mappedLobby });
        })

        HttpRequest.getRoom({ id: roomId }).then((lobby) => {
            const mappedLobby = { ...lobby, userList: lobby.users || [] };
            dispatch({ type: 'update', payload: mappedLobby });
    
            if (user) {
                const match = lobby?.users.find(u => u.connectionId === user.connectionId);
                if (!match) {
                    ConnectionHub.joinLobby(roomId, user.name, user.userType);
                }
            }
        }).catch(() => {
            clearUser();
        });
    }, [roomId, user]);

    const onShowVotesClick = (event) => {
        event.preventDefault();
        ConnectionHub.showVote(roomId);
    }

    const onClearVotesClick = (event) => {
        event.preventDefault();
        ConnectionHub.clearVote(roomId);
    }

    const onVoteClick = (card) => {
        ConnectionHub.vote(roomId, card);
    };

    const onLeaveRoomClick = (event) => {
        event.preventDefault();
        ConnectionHub.leaveLobby(roomId);
        clearUser();
    }

    const clearUser = () => {
        localStorageService.clearLoggedUser();
        setUser(null);
    }

    const usersList = state.userList;
    const showVotes = state.showVotes || state.userList.reduce((acc,user) => (acc && user.vote), true);
    const peopleList = usersList.map(person => {
        const showVote = showVotes || (person.vote && person.connectionId === user.connectionId);
        return (<ListItem key={person.connectionId} name={person.name} vote={person.vote} showVote={showVote}></ListItem>);
    });

    return (
        <>
            { !user ? <Redirect to='/login' /> :
                <div className="home-main">
                    <h2>{user.name}</h2>
                    <button onClick={onClearVotesClick}>Clear Votes</button>
                    <button onClick={onShowVotesClick}>Show Votes</button>
                    <button onClick={onLeaveRoomClick}>Leave Room</button>
                    <hr/>
                    <div className="people-list">{peopleList}</div>
                    {user.userType === 1 && <Cards items={state.cards} onSelection={onVoteClick} selectedCard={user.vote} disable={state.showVotes} /> }
                </div>
            }
        </>
    );
}
