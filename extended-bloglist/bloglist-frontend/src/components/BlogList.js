import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const BlogList = (props) => {

    const blog = useSelector((state) => {
        return state.blog
    })

    const blogView = () => {
        return blog.map((value, index) => (
            <div key={value.id} style={{borderColor: "gray", borderWidth: '1px', borderStyle: 'solid'}}>

                <Link to={`/blogs/${value.id}`}>{value.title}</Link>
            </div>
        ))
    }

    return (
        <div >

            {props.token ?
                <div>
                    <h1>Blog App</h1>
                    {blogView()}
                </div>
                : null}
        </div>
    )
}

export default BlogList
