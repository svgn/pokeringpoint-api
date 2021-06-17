import React, { useState } from 'react';
import {Grid, TextField, Button, FormHelperText} from '@material-ui/core';

function CreateRoom({ onCreateClick, onCancelClick }) {
    const [roomName, setRoomName] = useState('');
    const [roomNameError, setRoomNameError] = useState(false);
    const createClick = () => {
        if (roomName === '') {
            setRoomNameError(true);
            return;
        }
        onCreateClick(roomName);
    };
    const onRoomNameChange = (e) => {
        if (roomNameError) {
            setRoomNameError(false);
        }
        setRoomName(e.target.value);
    }

    return (
        <Grid
            container
            spacing={3}
            justify="center"
            lignItems="center"
            alignContent="center"
            direction="column"
            style={{ minHeight: "25vh" }}>
            <Grid key={0} item>
                <TextField
                    value={roomName}
                    error={roomNameError}
                    onChange={onRoomNameChange}
                    placeholder="Room name" />
                <FormHelperText error={roomNameError}>Enter room name.</FormHelperText>
            </Grid>
            <Grid key={1} item>
                <Grid
                    container
                    spacing={3}
                    direction="row">
                    <Grid key={0} item>
                        <Button variant="contained" color="primary" size="large" onClick={onCancelClick}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid key={1} item>
                        <Button variant="contained" color="primary" size="large" onClick={createClick}>
                            Create
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    )
}

export default CreateRoom;
