import React from 'react'

const Search = ({showFilter, handleSearchChange}) => {
  return(
    <div>
      <div> Search country: <input value={showFilter} onChange={handleSearchChange}></input> </div>
    </div>
  )
}

export default Search