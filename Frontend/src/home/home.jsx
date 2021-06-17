import { ListItem } from './list-item/list-item.jsx';
import { useReducer } from 'react';
import { useEffect } from 'react';
import ConnectionHub from '../rest/connectionHub.js';
import HttpRequest from '../rest/httpRequest';

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

export function Home(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        HttpRequest.getRoom({ id: props.user.lobbyId}).then(lobby => {
            const mappedLobby = { ...lobby, userList: lobby.users || [] };
                dispatch({ type: 'update', payload: mappedLobby });
            })
        ConnectionHub.subscribeForUpdateLobby(props.user.lobbyId, (lobby) => {
            const mappedLobby = { ...lobby, userList: lobby.users || [] };
            dispatch({ type: 'update', payload: mappedLobby });
        })
    }, [])
    const onShowVotesClick = (event) => {
        event.preventDefault();
        dispatch({ type: 'showVotes' });
        ConnectionHub.showVote(props.user.lobbyId);
    }

    const onClearVotesClick = (event) => {
        event.preventDefault();
        dispatch({ type: 'clearVotes' });
        ConnectionHub.clearVote(props.user.lobbyId);
    }

    const onVoteClick = (event, vote) => {
        event.preventDefault();
        const payload = {
            connectionId: props.user.connectionId,
            vote
        }
        dispatch({ type: 'vote', payload }) ;
        ConnectionHub.vote(props.user.lobbyId, vote);
    };
    const voteButtonsList = state.cards.map(vote => {
        return (
            <button key={vote}
                    onClick={(event) => onVoteClick(event, vote)}>
                {vote}
            </button>
        );}
    );

    const usersList = state.userList;
    const showVotes = state.showVotes || state.userList.reduce((acc,user) => (acc && user.vote), true);
    const peopleList = usersList.map(person => {
        const showVote = showVotes || (person.vote && person.connectionId === props.user.connectionId);
        return (<ListItem key={person.connectionId} name={person.name} vote={person.vote} showVote={showVote}></ListItem>);
    });

    return (
        <div className="home-main">
            <h2>{props.user.name}</h2>
            <button onClick={onClearVotesClick}>Clear Votes</button>
            <button onClick={onShowVotesClick}>Show Votes</button>
            <hr/>
            <div className="votes">{voteButtonsList}</div>
            <hr/>
            <div className="people-list">{peopleList}</div>
        </div>
    );
}