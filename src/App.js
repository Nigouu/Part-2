import React, { useState, useEffect } from 'react'
import RenderAll from './components/RenderAll.js'
import Form from './components/Form.js'
import Search from './components/Search.js'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showFilter, setShowFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


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
    if (persons.find(p => p.name === newName)){
      if (window.confirm(`${newName} is already aded to phonebook, do you want to update the existing contact?`)){
        const personId = persons.find(p => p.name === newName)
        personService
          .update(personId.id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== personId ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
        })
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
      })
    }
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }


  const deletePerson = (event) => {
    const deleteP = persons.find(p => p.id === event.target.value)
    if (window.confirm(`Do you want to delete ${event.target.name} ?`)) {
      personService
      .del(event.target.value)
      .then(persons => {
        setPersons(persons.filter(p => p.id !== event.target.value))
        console.log(deleteP)
      })
      .catch(error => {
       if (error.response) {
         console.log(error.response.data)
      } 
      }) 
      personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Search showFilter={showFilter} handleSearchChange={handleSearchChange}/>
      
      <h2>Add New</h2>
      <Form addPerson={addPerson} 
      newName={newName} 
      handleNameChange={handleNameChange} 
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <RenderAll persons={persons} showFilter={showFilter} deletePerson={deletePerson}/>

    </div>
  )
}

export default App