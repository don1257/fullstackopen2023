import {Link} from "react-router-dom";

const NavBar = (props) => {

    return (
        <div style={{backgroundColor: 'lightgrey'}}>
            <Link to={`/`} style={{ marginRight: "5px" }}>blogs</Link>
            <Link to={`/users`} style={{ marginRight: "5px" }}>users</Link>
            <p1 style={{ marginRight: "5px" }}>{props.username} is logged in</p1>
            <button onClick={props.logout}>log out</button>
        </div>

    )}

export default NavBar
