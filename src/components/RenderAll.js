import React from 'react'
import RenderSingle from './RenderSingle.js'


const RenderAll = ({ persons, showFilter }) => {

    const personsToShow = showFilter
    ? persons.filter(person => person.name.toLowerCase().indexOf(showFilter.toLowerCase()) !== -1)
    : persons

    console.log(showFilter);

  return (
    <div>
        {personsToShow.map(person => <RenderSingle key={person.name} person={person}/>)}
    </div>
  )
}

export default RenderAll