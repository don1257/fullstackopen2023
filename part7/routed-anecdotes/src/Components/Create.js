import { useNavigate } from 'react-router-dom'
import {useField} from "../hooks/useField";

export const CreateNew = (props) => {
    const contentField = useField();
    const authorField = useField();
    const infoField = useField();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: contentField.value,
            author: authorField.value,
            info: infoField.value,
            votes: 0
        })
        navigate('/')
        props.setNotification(contentField.value)
    }

    const handleReset = () => {
        contentField.reset()
        authorField.reset()
        infoField.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' value={contentField.value} onChange={contentField.onChange} />
                </div>
                <div>
                    author
                    <input name='author' value={authorField.value} onChange={authorField.onChange} />
                </div>
                <div>
                    url for more info
                    <input name='info' value={infoField.value} onChange={infoField.onChange} />
                </div>
                <button>create</button>
            </form>
            <button onClick={handleReset}>reset</button>
        </div>
    )

}
