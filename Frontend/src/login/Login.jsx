import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';
import Actions from './Actions';
import HttpRequest from "../rest/httpRequest";

function Login({ onJoinRoom }) {
    const [isJoinRoomView, setJoinRoomView] = useState(false);
    const [isCreateRoomView, setCreateRoomView] = useState(false);

    const onCreateRoom = (roomName) => {
        HttpRequest.createRoom({ roomName });
        setJoinRoomView(true);
        setCreateRoomView(false);
    }

    return (
        <div className="login-form">
            <Paper style={{height: "45vh", width: "45vh"}} elevation={3}>
                { !isJoinRoomView && !isCreateRoomView &&
                    <Actions
                        onCreateClick={() => setCreateRoomView(true)}
                        onJoinClick={() => setJoinRoomView(true)}/>
                }
                {isJoinRoomView &&
                    <JoinRoom
                        onCancelClick={() => setJoinRoomView(false)}
                        onJoinClick={(...args) => onJoinRoom(...args)}/>
                }
                {isCreateRoomView &&
                    <CreateRoom
                        onCancelClick={() => setCreateRoomView(false)}
                        onCreateClick={onCreateRoom}/>
                }
            </Paper>
        </div>
    )
}

export default Login;
