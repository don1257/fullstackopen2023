import React from "react";

export const PersonForm = (props) => {

    return(
        <form onSubmit={props.addEntry}>
            name:
            <input value={props.inputValue} onChange={props.inputChange}/>
            <div>
                number:
                <input value={props.phone} onChange={props.numberChange}/>
            </div>
            <button type="submit">add</button>
        </form>
    )

}
