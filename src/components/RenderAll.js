import React from 'react'
import RenderSingle from './RenderSingle.js'


const RenderAll = ({ persons, showFilter, deletePerson }) => {

    const personsToShow = showFilter
    ? persons.filter(person => person.name.toLowerCase().indexOf(showFilter.toLowerCase()) !== -1)
    : persons

    console.log(showFilter);

  return (
    <div>
        {personsToShow.map(person => <RenderSingle key={person.name} person={person} deletePerson={deletePerson}/>)}
    </div>
  )
}

export default RenderAll