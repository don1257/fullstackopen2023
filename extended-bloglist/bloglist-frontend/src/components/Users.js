import {useSelector} from "react-redux";
import {Link} from "react-router-dom";


const User = (props) => {

    let userCount = {}

    const setUserCount = (array) => {
        for (let i = 0; i < array.length; i++){
            let item = array[i].username
            if (userCount[item]){
                userCount[item] += 1
            } else{
                userCount[item] = 1
            }
        }
    }

    const username = useSelector((state) => {
        setUserCount(state.blog)
        return state.blog
    })

    return (
        <div style={{ borderColor: "gray" }}>
            <h1>Users</h1>
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>BlogCount</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(userCount).map((key) => (
                    <tr key={key}>
                        <td>
                            <Link to={`/users/${key}`}>{key}</Link>
                        </td>
                        <td>{userCount[key]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default User
