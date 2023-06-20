import BlogService from "../services/blogs";
import {useDispatch, useSelector} from "react-redux";
import {deleteBlog} from "../reducers/blogReducer";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {setNotification} from "../reducers/notificationReducer";

const Blog = (props) => {

    const dispatch = useDispatch()
    const blogs = useSelector((state) => {return state.blog;})
    const [inputs, setInputs] = useState({});
    const params = useParams();
    const {id} = params;

    const blogById = (id) => blogs.find(a => a.id === id)
    const blogSelected = blogById(id)
    const blogSelectedComments = blogSelected.comments

    const deleteOnClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete this blog?")
        if (confirmed){
            BlogService.deleteBlog(blogSelected)
            dispatch(deleteBlog(blogSelected))
        }
    }

    const onHandleSubmit = (event) => {
        event.preventDefault()
        const obj = JSON.parse(JSON.stringify(inputs));
        obj.id = id
        console.log(obj)

        BlogService.addComment(obj).then(r => console.log(r))
    }

    const onHandleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs((values)=> ({...values, [name]:value}))
    }

    return (
        <div style={{borderColor: "gray", borderWidth: '1px', borderStyle: 'solid'}}>
            {blogSelected.title}
                <div>
                <div>{blogSelected.url}</div>
                    <div>{blogSelected.likes}</div>
                    <button id='like' onClick={() => props.upVote(blogSelected)}>Like</button>
                    <div>{blogSelected.author}</div>
                    <button id='remove' onClick={deleteOnClick}>Remove</button>
                </div>
                <div>
                    <h2>Comments</h2>
                    <form onSubmit={onHandleSubmit}>
                        <input
                            id='inputComment'
                            type='test'
                            name='content'
                            onChange={onHandleChange}
                        />
                        <input id='inputSubmit' type='submit'/>
                    </form>
                    {blogSelectedComments.map((blog) => <ol>{blog?.content}</ol>)}
                </div>
        </div>
    )
}

export default Blog
