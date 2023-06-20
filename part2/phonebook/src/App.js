import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')


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
          name : newName,
          number : newPhone,
          id : 1
      }

      if (checkPersonsDuplicates().length > 0){
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewPhone('')
        return
      }

      setPersons(persons.concat(entryObject))

      // reset the button
      setNewName('')
      setNewPhone('')
  }

  return (
      <div>
        <h2>Phonebook</h2>

        filter shown with
        <input value={newFilter} onChange={handleFilterChange}/>


        <h2>add a new</h2>
        <form onSubmit={addEntry}>
                name:
                <input value={newName} onChange={handleInputChange}/>
            <div>
                number:
                <input value={newPhone} onChange={handleNumberChange}/>
            </div>

            <button type="submit">add</button>

        </form>


          <h2>Numbers</h2>

        ...
          <div>

              {persons.map(obj => <div>{obj.name} {obj.number}</div>)}
          </div>
      </div>
  )
}

export default App