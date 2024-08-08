import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Search() {
  const [query, setQuery] = useState('');
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e : any) => {
    setQuery(e.target.value);
  };

  
  const handleSubmit = (e : any) => {
    //check if request works, if so navigate to display and pass query into the url
    axios.head(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`)
      .then(function(response) {
        navigate(`/display?query=${encodeURIComponent(query)}`);
      })
      .catch(function(error) {
        setHide(false);
      })
    
    e.preventDefault();
  };

  return (
    <div className = "relative flex flex-col flex-shrink-0 items-center gap-14">
      <label htmlFor = "search" className = "sr-only">
        Search
      </label>
      <input id = "search" type = "text" value = { query } onChange = { handleInputChange }
        className = "block w-full rounded-md border-8 border-yellow-200 py-[9px] pl-4 text-sm outline-2"
      />
      {/* Conditional rendering this div based on hide var, which is true if the request failed */}
      {! hide && 
        <div id = "toHide" className = "h-10 w-full rounded-xl right-2 top-2 text-sm text-white bg-red-500 flex justify-center items-center">
          <p><strong>The pokemon was not found!</strong></p>
        </div>
      }
      <button type = "submit" onClick = {handleSubmit} className = "h-10 w-2/5 rounded-xl right-2 top-2 text-sm text-black bg-[#e0ec5c]">
        Search!
      </button>
    </div>
  );
}
