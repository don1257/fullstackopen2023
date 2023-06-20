import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

const Blog = (props) => {

    const blog = useSelector((state) => {return state.blog})
    const params = useParams();
    const {id} = params;

    const blogById = (username) => blog.filter(a => a.username === username)
    const blogSelected = blogById(id)

    return (
        <div style={{borderColor: "gray", borderWidth: '1px', borderStyle: 'solid'}}>

           <h2>Added Blogs</h2>
            {blogSelected.map((value, index) => (
                <div>
                <Link to={`/blogs/${value.id}`}>{value.title}</Link>
                </div>
            ))}

        </div>
    )
}

export default Blog
