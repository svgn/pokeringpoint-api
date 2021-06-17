import React from 'react';
import { Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import blue from "@material-ui/core/colors/blue";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        minHeight: 120,
        position: 'absolute',
        bottom: 0,
        left: 0,
        margin: 0,
        width: '100%'
    },
    paper: {
        height: 70,
        width: 50,
        background: blue[100],
        cursor: 'pointer',
        fontSize: '1.2rem',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'nowrap',

        "&:active, &:hover": {
            backgroundColor: blue[300],
            marginTop: '-.25rem'
        }
    },
    selectedCard: {
        backgroundColor: blue[300],
        marginTop: '-.25rem'
    },
    disableCard: {
        background: 'gray',
        pointerEvents: 'none'
    }
}));

function Cards({ items, onSelection, selectedCard, disable }) {
    const classes = useStyles();
    const onSelect = (card) => {
        if (!disable) {
            onSelection(card);
        }
    }

    return (
        <Grid
            className={classes.root}
            container
            item
            spacing={3}
            justify="center"
            lignItems="center"
            alignContent="center">
            {items.map((card) => {
                const disableClass = disable ? classes.disableCard : '';
                const selectedClass = selectedCard ? classes.selectedCard : '';
                return (
                    <Grid key={card} item onClick={() => onSelect(card)}>
                        <Paper
                            className={`${classes.paper} ${selectedClass} ${disableClass}`}>
                            <Typography variant="h5" component="h3">
                                {card}
                            </Typography>
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    )
}

export default Cards;
