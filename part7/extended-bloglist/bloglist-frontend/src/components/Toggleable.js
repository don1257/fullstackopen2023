import {useState} from "react";
import PropTypes from 'prop-types'

const Toggleable = (props) => {

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none'}

    const toggleVisbility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisbility}>{props.buttonLabel}</button>
            </div>
            <div className={'toggleChild'} style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisbility}>cancel</button>
            </div>
        </div>

)}

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Toggleable
