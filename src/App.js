import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showFilter, setShowFilter ] = useState('')


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
      console.log(event.target.value)
      setShowFilter(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()
    console.log('person added', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }    
    persons.forEach(function(item){
      if (newName === item.name || newNumber === item.number){
        window.alert(`${newName} is already added to phonebook`);
      } else {
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
      }
    })    
  }


  const personsToShow = showFilter
    ? persons.filter(person => person.name.toLowerCase().indexOf(showFilter.toLowerCase()) !== -1)
    : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div> 
          input shown with: <input value={showFilter} onChange={handleSearchChange}></input>
        </div>
      </form>
      <h2>Add New</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>name: <input value={newName} onChange={handleNameChange}/></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => <div key={person.name}>{person.name}: {person.number}</div>)}
    </div>
  )
}
export default App