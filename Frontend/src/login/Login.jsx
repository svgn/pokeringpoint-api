import React, { useEffect, useState, useCallback } from 'react';
import { Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { localStorageService } from '../storage/local-storage.service';
import { Redirect } from 'react-router-dom';
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';
import Actions from './Actions';
import HttpRequest from "../rest/httpRequest";
import ConnectionHub from "../rest/connectionHub";


function Login() {
    const [isJoinRoomView, setJoinRoomView] = useState(false);
    const [isCreateRoomView, setCreateRoomView] = useState(false);
    const history = useHistory();
    const user = localStorageService.getLoggedUser();

    const joinRoom = useCallback(async ({ username, isObserver, roomId }) => {
        const room = await HttpRequest.getRoom({ id: roomId });
        const userType = isObserver ? 0 : 1;
        ConnectionHub.joinLobby(room.id, username, userType);
      }, []);

    useEffect(() => {
        ConnectionHub.subscribeForJoinLobby((user) => {
          localStorageService.setLoggedUser(user);
          const { lobbyId } = user; 
          history.push(`/room/${lobbyId}`);
        });
    }, [history]);

    const onCreateRoom = async (roomName) => {
        const response = await HttpRequest.createRoom({ roomName });
        const room = await response.json();
        history.push(`/room/${room.id}`);
        setJoinRoomView(true);
        setCreateRoomView(false);
    }

    const onJoinRoomClick = ({ username, isObserver, roomId }) => {
        joinRoom({ username, isObserver, roomId });
    }

    return (
        <>
            { user && <Redirect to={`/room/${user.lobbyId}`} /> }

            <div className="login-form">
                <div>
                    { !isJoinRoomView && !isCreateRoomView &&
                        <Actions
                            onCreateClick={() => setCreateRoomView(true)}
                            onJoinClick={() => setJoinRoomView(true)}/>
                    }
                    {isJoinRoomView &&
                        <JoinRoom
                            onCancelClick={() => setJoinRoomView(false)}
                            onJoinClick={onJoinRoomClick}/>
                    }
                    {isCreateRoomView &&
                        <CreateRoom
                            onCancelClick={() => setCreateRoomView(false)}
                            onCreateClick={onCreateRoom}/>
                    }
                </div>
            </div>
       </>
    )
}

export default Login;
