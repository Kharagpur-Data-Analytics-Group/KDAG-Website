import React from 'react'
import SearchResult from './searchResult'
const searchCom = () => {
  return (
    <div>
         <div>
             <input type="text" placeholder="Search" />
             <button>Search</button>
         </div>
         <div>
            <SearchResult/>
         </div>
    </div>
  )
}

export default searchCom