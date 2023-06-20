import {Link, useParams} from 'react-router-dom'

export const Anecdote = ({ anecdotes, vote, anecdoteId, anecdoteById }) => {
    const params = useParams();
    const {id} = params;
    const anecdoteIndex = anecdoteById(parseInt(id))

    return (
        <div>
            <h2>{anecdoteIndex.content} by {anecdoteIndex.author}</h2>
            <div>has {anecdoteIndex.votes} votes</div>
            <div>
            for more info see <Link to={`${anecdoteIndex.info}`} >{anecdoteIndex.info}</Link>
            </div>
        </div>
    );
}
