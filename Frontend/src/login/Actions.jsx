import React from 'react';
import { Grid, Button } from '@material-ui/core';

function Actions({ onCreateClick, onJoinClick }) {
    return (
        <Grid 
            container
            spacing={10}
            justify="center"
            lignItems="center"
            alignContent="center"
            style={{ minHeight: "25vh" }}>
            <Grid key={0} item>
                <Button variant="contained" color="primary" size="large" onClick={() => onCreateClick()}>
                    Create Room
                </Button>
            </Grid>
            <Grid key={1} item>
                <Button variant="contained" color="primary" size="large" onClick={() => onJoinClick()}>
                    Join Room
                </Button>
            </Grid>
        </Grid>
    )
}

export default Actions;