import React from 'react'
import { useState } from 'react'

const SearchBar = ({ onSearch }) => {

  // State to store the search query input by the user
  const [query, setQuery] = useState("");

  // Function to handle the search action when the button is clicked
  const handleSearch = () => {
    if (onSearch) {
      console.log("Search query being set from searchBar:", query); //1st log
      onSearch({ query }); // Calls the onSearch function passed as a prop with the query      
    }
  };

  // Function to clear the search input
  const handleClear = () => {
    setQuery(""); // Reset search query state
    if (onSearch) {
      onSearch({ query: "" }); // Trigger search with empty query
    }
  };

  return (
    <div className="flex items-center justify-between rounded-full w-[95%] h-[65%] font-[Poppins] border-1 border-[#b3b3b3]">

       {/* Input field for entering the search query */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Updates the state on input change
        className="ml-[3%] w-[70%] focus:outline-none"
      />
      
      {/* Clear button - only visible when query is not empty */}
      {query && (
        <button 
          onClick={handleClear}
          className="text-gray-500 hover:text-black transition-all mx-2 cursor-pointer"
        >
          ✖
        </button>
      )}

      {/* Search button to trigger the handleSearch function */}
      <button
        onClick={handleSearch}
        className="bg-[#3B3C3C] rounded-r-full w-[20%] h-full text-white text-[1.1vw] hover:bg-[#1d1d1d] transition-all cursor-pointer active:bg-[#3B3C3C]"
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar