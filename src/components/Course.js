import React from 'react'

const Total = ({course}) => {
  const arr = []
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  {course.parts.map(parts => 
      arr.push(parts.exercises)
  )}
  return(
    <div>
      Total: {arr.reduce(reducer)} 
    </div>
  )
  }

const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      
        {course.parts.map(parts => 
          <li key={parts.id}>
            {parts.name} {parts.exercises}
          </li>
        )}
        <Total course={course}/>
      
    </div>
  )
}

export default Course