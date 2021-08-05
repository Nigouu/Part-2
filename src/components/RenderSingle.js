import React from 'react'

const RenderSingle = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

export default RenderSingle