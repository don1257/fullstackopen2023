import React, {useEffect, useState} from 'react'
import {Filter} from "./components/Filter/filter";
import {PersonForm} from "./components/PersonForm/PersonForm";
import {Persons} from "./components/Persons/Persons";
import noteService from "./services/notes";
import {Notification} from "./components/Notification/Notification";

const App = () => {

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState('')

    useEffect(() => {
        noteService
            .getAllNotes()
            .then(response => setPersons(response))
    }, []);

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const checkPersonsDuplicates = () =>{
    return persons.filter(ele => ele.name == newName)
  }

  const addEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      reqName : newName,
      reqNumber : newPhone,
    }

    if (checkPersonsDuplicates().length > 0){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewPhone('')
      return
    }

    noteService
      .updateNotes(entryObject)
      .then(() => {
          setNotification(entryObject.reqName)
          return noteService.getAllNotes();
      })
      .then(response => {
          setPersons(response);
      })
      .catch(error => {
          console.log("An error occurred: ", error);
      });

    // reset the button
    setNewName('')
    setNewPhone('')
  }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setNotification(null);
        }, 3000); // default timeout of 5 seconds

        return () => {
            clearTimeout(timeoutId);
        };
    }, [notification]);

    return (
      <div>
        {notification ? <Notification message={notification}></Notification> : null}
        <h2>Phonebook</h2>
        <Filter value={newFilter} onChange={handleFilterChange}/>

        <h2>add a new</h2>

        <PersonForm
          addEntry = {addEntry}
          inputValue = {newName}
          inputChange = {handleInputChange}
          phone = {newPhone}
          numberChange = {handleNumberChange}
        >
        </PersonForm>

        <h2>Numbers</h2>
        ...

        <Persons persons={persons} filter={newFilter}></Persons>

      </div>
  )
}

export default App
