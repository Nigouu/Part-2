import React from 'react'
import RenderSingle from './RenderSingle.js'
import RenderCountry from './RenderCountry.js'

const RenderAll = ({ persons, showFilter}) => {

    const personsToShow = showFilter
    ? persons.filter(person => person.name.toLowerCase().indexOf(showFilter.toLowerCase()) !== -1)
    : persons
    console.log(showFilter);

  if ( personsToShow.length < 11 && personsToShow.length > 1){
    return (
      <div>
        <h2>Countrylist</h2>
          {personsToShow.map(person => <RenderSingle key={person.name} person={person} />)}
      </div>
    )
  } else if ( personsToShow.length === 1){
    return(
      <div>
        {personsToShow.map(person => <RenderCountry key={person.name} person={person}/>)}
      </div>
    )
  } else {
    return (
      <div>
        Too many matches, specify more!
      </div>
    )
  }
}

export default RenderAll