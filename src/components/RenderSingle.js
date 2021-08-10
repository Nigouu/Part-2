
import RenderCountry from './RenderCountry.js'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const RenderSingle = ({ person}) => {

  const [show, setShow] = useState(true)
  const [ we, setWe ] = useState({}) 
  const api_key = process.env.REACT_APP_API_KEY.toString()

  const hook = () => {
  axios
    .get("http://api.weatherstack.com/current?access_key=" + api_key + "&query=" + person.capital)
    .then(response => {
      setWe(response.data)
    })
  }

  useEffect(hook, [])

  if (show === true){
    return (
      <div>
        {person.name}
        <button onClick={() => setShow(!show)}>
        {show ? 'show' : 'hide' }
        </button>
      </div>
    ) 
  } else {
    return(
      <div>
        {person.name}
        <button onClick={() => setShow(!show)}>
        {show ? 'show' : 'hide' }
        </button>
        <RenderCountry key={person.name} person={person} we={we}/>
        <div>
          <h2>Weather in {person.capital}</h2>
          Temperature: {we.current.temperature} <br/>
          <img alt="x" style={{height:"200px", width:"200px"}} src={we.current.weather_icons}></img><br/>
          {we.current.weather_descriptions}<br/>
        </div>
      </div>
    )
  }
}

export default RenderSingle