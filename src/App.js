import React, { useState } from 'react'
import RenderAll from './components/RenderAll.js'
import Form from './components/Form.js'
import Search from './components/Search.js'


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


  return (
    <div>
      <h2>Phonebook</h2>
      <Search showFilter={showFilter} handleSearchChange={handleSearchChange}/>
      
      <h2>Add New</h2>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <RenderAll persons={persons} showFilter={showFilter}/>

    </div>
  )
}

export default App