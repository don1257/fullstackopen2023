import React from "react";
import noteService from "../../services/notes";

export const Persons = (props) => {

    function deletePersonConfirm(id, name){
        if (window.confirm(`Do you want to delete ${name}?`)) {
            noteService.deleteNotes(id).then(r => console.log(r))
        }else{
            console.log('nothing')
        }
    }

    return (
        <div>
            {props.persons
                .filter(person => person.name.toLowerCase().includes(props.filter))
                .map(obj => (
                    <div key={obj.id}>
                        {obj.name} {obj.number}
                        <button onClick={() => deletePersonConfirm(obj.id, obj.name)}>Delete</button>
                    </div>)
                )
            }
        </div>
    )
}
