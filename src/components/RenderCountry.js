import React from 'react'

const RenderCountry = ({ person }) => {

    return (
        <div>
            <h1>{person.name}</h1>
            <p>Capital:  {person.capital}</p>
            <p>Population: {person.population}</p>
            <img alt="new" style={{heigth: "100px", width: "200px"}} src= {person.flag} ></img>
            <h3>Languages</h3>
            {person.languages.map(language => <li> {language.name}</li>)}
        </div>
    )
}

export default RenderCountry