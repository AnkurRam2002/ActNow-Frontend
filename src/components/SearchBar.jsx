import React from 'react'
import { useState } from 'react'

const SearchBar = ({ onSearch }) => {

  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
      console.log(query);
    }
  };
  return (
    <div className="flex items-center justify-between rounded-full w-[95%] h-[65%] font-[Poppins] border-1 border-[#b3b3b3]">
       <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='ml-[3%] w-[70%] focus:outline-none'
      />
      <button onClick={handleSearch} className="bg-[#3B3C3C] rounded-r-full w-[20%] h-full text-white text-[1.1vw]">
        Search
      </button>
    </div>
  )
}

export default SearchBar