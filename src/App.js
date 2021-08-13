import React, { useState, useEffect } from 'react'
import RenderAll from './components/RenderAll.js'
import Form from './components/Form.js'
import Search from './components/Search.js'
import personService from './services/persons'
import Notification from './components/Error.js'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showFilter, setShowFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
      if (window.confirm(`${newName} is already added to phonebook, do you want to update the existing contact?`)){
        const personId = persons.find(p => p.name === newName)
        personService
          .update(personId.id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== personId ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            })
          .catch(error => {
            setErrorMessage(
              `the person '${personId.name}' was already deleted from server`
              )
              setTimeout(() => {
              setErrorMessage(null)
              }, 5000)
            setPersons(persons.filter(n => n.id !== personId.id))
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
          setErrorMessage(
            `Added ${newName}`
            )
            setTimeout(() => {
            setErrorMessage(null)
            }, 5000)
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
        setPersons(Object.values(persons).filter(p => p.id !== event.target.value))
        console.log(deleteP)
      })
      .catch(error => {
        setErrorMessage(
          `the person '${event.target.name}' was already deleted from server`
          )
          setTimeout(() => {
          setErrorMessage(null)
          }, 5000)
          setPersons(Object.values(persons).filter(p => p.id !== event.target.value))
      })
    }
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Phonebook app, Department of Computer Science, University of Helsinki 2021</em>
      </div>
    )
  }
  


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <Search showFilter={showFilter} handleSearchChange={handleSearchChange}/>
      
      <h2>Add New</h2>
      <Form addPerson={addPerson} 
      newName={newName} 
      handleNameChange={handleNameChange} 
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <RenderAll persons={persons} showFilter={showFilter} deletePerson={deletePerson}/>
      <Footer />
    </div>
  )
}

export default App