import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RenderAll from './components/RenderAll.js'
import Search from './components/Search.js'


const App = () => {
  const [ country, setCountry ] = useState([]) 
  const [ showFilter, setShowFilter ] = useState('')
  // const [ newName, setNewName ] = useState('')
  // const [ newNumber, setNewNumber ] = useState('')



  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountry(response.data)
      })
  }, [])

  country.forEach(function (element) {
    element.Show = "false";
  });

  const handleSearchChange = (event) => {
      console.log(event.target.value)
      setShowFilter(event.target.value)
  }

  return (
    <div>
      <h1>Search for Countries</h1>
      <Search showFilter={showFilter} handleSearchChange={handleSearchChange}/>
      <RenderAll persons={country} showFilter={showFilter}/>
    </div>
  )
}

export default App