import {useEffect, useState} from "react";
import LoginService from "../services/login";
import {useDispatch} from "react-redux";
import {setUser} from "../reducers/userReducer";

const Login = (props) => {
    const [inputs, setInputs] = useState({})
    const [error, setError] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        LoginService.login(inputs)
            .then(r => {
                dispatch(setUser(r))
            })
            .catch(err => setError(true))
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    useEffect(()=> {
        const timeoutId = setTimeout(() => {
            setError(false);
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    },[error])

    return(
        <div>
            <h1>log in to application</h1>
            {error
                ?  <div style={{backgroundColor: 'lightgrey'}}>Wrong Username and Password</div>
                :  null
            }

            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>username</label>
                <input
                    id='username'
                    type='text'
                    name='username'
                    onChange={handleChange}
                />
                <br/>
                <label htmlFor='password'>password</label>
                <input
                    id='password'
                    type='password'
                    name='password'
                    onChange={handleChange}
                />
                <br/>
                <input type='submit' id='login' value="login"/>
            </form>
        </div>
    );
}

export default Login
