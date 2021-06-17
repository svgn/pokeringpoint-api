import React, { useState, useEffect } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, Button, FormControlLabel, Checkbox, FormHelperText } from '@material-ui/core';
import HttpRequest from '../rest/httpRequest';
import LocationHash from '../utils/locationHash';

function JoinRoom({ onJoinClick, onCancelClick }) {
    const [roomId, setRoomId] = useState('');
    const [roomError, setRoomError] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [isObserver, setIsObserver] = useState();
    const [rooms, setRooms] = useState([]);

    const selectRoom = () => {
        if (roomId === '') {
            setRoomError(true);
        }
        if (username === '') {
            setUsernameError(true);
        }
        if (roomId && username) {
            onJoinClick({ username, roomId, isObserver });
        }
    }
    const cancelRoom = () => {
        LocationHash.clear();
        onCancelClick();
    }
    const onRoomIdChange = (e) => {
        if (roomError) {
            setRoomError(false);
        }
        setRoomId(e.target.value);
    }
    const onUsernameChange = (e) => {
        if (usernameError) {
            setUsernameError(false);
        }
        setUsername(e.target.value)
    }

    useEffect(async () => {
        const response = await HttpRequest.getRooms();
        response.unshift({ id: '', value: ''})
        setRooms(response || []);

        if (LocationHash.has()) {
            const hash = LocationHash.get();
            const room = response.find(x => x.id === hash);
            if (room) {
                setRoomId(room.id);
            }
        }

    }, []);

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
                <FormControl size="medium" style={{ minWidth: 195 }}>
                    <InputLabel value={roomId}>Room</InputLabel>
                    <Select
                        native
                        error={roomError}
                        autoWidth={false}
                        value={roomId}
                        onChange={onRoomIdChange}
                        >
                        {rooms.map(room => {
                            return <option key={room.id} value={room.id}>{room.name}</option>
                        })}
                    </Select>
                    <FormHelperText error={roomError}>Select room.</FormHelperText>
                </FormControl>
            </Grid>
            <Grid key={1} item>
                <TextField
                    error={usernameError}
                    value={username}
                    onChange={onUsernameChange}
                    placeholder="Username" />
                <FormHelperText error={usernameError}>Enter username.</FormHelperText>
            </Grid>
            <Grid key={2} item>
                <FormControlLabel
                    control={<Checkbox checked={isObserver} color="primary" onChange={()=>setIsObserver(!isObserver)} />}
                    label="Join as observer"
                />
            </Grid>
            <Grid key={3} item>
                <Grid
                    container
                    spacing={3}
                    direction="row">
                    <Grid key={0} item>
                        <Button variant="contained" color="primary" size="large" onClick={cancelRoom}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid key={1} item>
                        <Button variant="contained" color="primary" size="large" onClick={selectRoom}>
                            Join
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default JoinRoom;
