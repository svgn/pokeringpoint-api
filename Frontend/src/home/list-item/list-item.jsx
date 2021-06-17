export function ListItem ({ name, vote, showVote }) {
    let voteClasses = ['user-vote-list__right'];

    return <div className="user-vote-list">
        <div className="user-vote-list__left">{name}</div>
        { showVote ? <div className='user-vote-list__right'>{vote}</div> : <div className='user-vote-list__right user-vote-list__right--hidden'></div> }
    </div>
}