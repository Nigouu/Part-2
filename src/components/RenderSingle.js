import React from 'react'

const RenderSingle = ({person, deletePerson }) => {

  return (
    <div key={person.id}>
      {person.name} : {person.number} 
      <button value={person.id} name={person.name} onClick={deletePerson}>delete</button>
    </div>
    
    
  )
}

export default RenderSingle