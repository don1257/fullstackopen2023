import {useEffect, useState} from "react";
import BlogService from "../services/blogs";
import {useDispatch, useSelector} from "react-redux";
import {setNotification} from "../reducers/notificationReducer";

const CreateBlogs = (props) => {
    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch()

    const notification = useSelector((state) => {
        return state.notification;
    })

    const username = useSelector((state) => {
        return state.user.username;
    })

    const token = useSelector((state) => {
        return state.user.token;
    })

    const onHandleSubmit = (event) => {
        event.preventDefault()
        const notification = true
        const obj = JSON.parse(JSON.stringify(inputs));
        obj.username = username
        console.log(token)
        BlogService.addOne(obj, token)
            .then(
                (r) => dispatch(setNotification(notification))
            )
    }

    const onHandleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs((values)=> ({...values, [name]:value}))
        console.log()
    }

    useEffect(()=> {
        const timeoutId = setTimeout(() => {
            dispatch(setNotification(false));
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    },[notification, dispatch])

    return(
        <div>
            <h1>create new</h1>
            {notification ? <h2 style={{backgroundColor: "lightcoral"}}>Added New Post</h2> : null}
            <form onSubmit={onHandleSubmit}>
                <label type='text' htmlFor='title'>title</label>
                <input
                    id='inputTitle'
                    type='text'
                    name='title'
                    onChange={onHandleChange}
                />
                <br/>
                <label type='text' htmlFor='author'>author</label>
                <input
                    id='inputAuthor'
                    type='text'
                    name='author'
                    onChange={onHandleChange}
                />
                <br/>
                <label type='text' htmlFor='url'>url</label>
                <input
                    id='inputUrl'
                    type='text'
                    name='url'
                    onChange={onHandleChange}
                />
                <br/>
                <input id='inputSubmit' type='submit'/>
            </form>
        </div>
    )

}

export default CreateBlogs
