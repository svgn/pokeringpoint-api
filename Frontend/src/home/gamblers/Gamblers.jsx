import { List, ListItem, ListItemText, Avatar, makeStyles, ListItemAvatar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    }
}));

function Gamblers ({ items, showVotes, user }) {
    const classes = useStyles();

    const gamblers = items?.map((item) => {
        const showVote = showVotes || (item.vote && item.connectionId === user.connectionId);
        return (
            <ListItem key={items.connectionId} className="user-vote-list">
                <ListItemAvatar>
                    <Avatar>
                        { showVote ?
                            <Typography variant="h5" component="h5">{item.vote}</Typography> :
                            <Typography variant="h5" component="h5">?</Typography>
                        }
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.vote ? 'Voted' : 'Not voted' } />
            </ListItem>
        )
    });

    return (
        <List className={classes.root}>
            {gamblers}
        </List>
    )
}

export default Gamblers;
