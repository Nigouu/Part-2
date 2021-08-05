import React from 'react'

const Search = ({showFilter, handleSearchChange}) => {
  return(
    <div>
      <div> input shown with: <input value={showFilter} onChange={handleSearchChange}></input> </div>
    </div>
  )
}

export default Search