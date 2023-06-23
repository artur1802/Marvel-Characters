// import React from "react";
// import { useRef } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Autosuggest from "react-autosuggest";
// import axios from "axios";
// // import utils
// import { fetchHeroes } from "../libs/utils";

// export default function SearchBar({ setter }) {



//   // Create a reference to the input element
//   let input = useRef('');

//   // Handle click event when the search button is clicked
//   const handleClick = async (e) => {
//     let value = input.current.value;
//     if (value === "") return;

//     try {
//       // Fetch heroes based on the search value
//       let heroes = await fetchHeroes(value);

//       // Call the setter function to update the state with the fetched heroes
//       setter(heroes);
//     } catch (err) {
//       // Handle any errors that occur during the fetch
//       return console.error(err);
//     }
//   };

//   return (
//     <form>
//       {/* Input field for searching a hero */}
//       <input type="text" placeholder="Search Hero..." ref={input} />

//       {/* Button to trigger the search */}
//       <button type="button" onClick={handleClick}>
//         Search
//       </button>
//     </form>
//   );
// }
import React, { useState } from "react";
import Autosuggest from 'react-autosuggest';
import { fetchHeroes } from "../libs/utils";
import "../index.css";


export default function SearchBar({ setter }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const handleSuggestionsFetchRequested = async ({ value }) => {
    const heroes = await fetchHeroes(value);
    setSuggestions(heroes.map(hero => hero.name));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleSuggestionSelected = (event, { suggestion }) => {
    setValue(suggestion);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === "") return;
    fetchHeroes(value)
      .then((heroes) => {
        setter(heroes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const inputProps = {
    placeholder: "Search Hero...",
    value,
    onChange: handleChange,
  };

  
    return (
        <form onSubmit={handleSubmit}>
          <Autosuggest class="autosuggest"
            suggestions={suggestions}
            onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
            onSuggestionSelected={handleSuggestionSelected}
            getSuggestionValue={(suggestion) => suggestion}
            renderSuggestion={(suggestion, { isHighlighted }) => (
              <div className={isHighlighted ? "suggestion-item highlighted" : "suggestion-item"}>
                {suggestion}
              </div>
            )}
            inputProps={inputProps}
            renderSuggestionsContainer={({ containerProps, children }) => (
              <div
                {...containerProps}
                className="custom-suggestions-container"
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  backgroundColor: 'white',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  borderRadius: '4px',
                  marginTop: '5px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                {children}
              </div>
            )}
          />
          
          <button type="submit">Search</button>
        </form>
      );
}
