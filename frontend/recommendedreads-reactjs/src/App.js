import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { createTheme } from "@nextui-org/react"
import { Input } from '@nextui-org/react';
import { NextUIProvider } from '@nextui-org/react';
import { Button } from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon"

const darkTheme = createTheme({
  type: 'dark',
  theme: {colors:{
     background: '#121212',

    gradient:  'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'
  }
  }
});


function App() {
  const [textInput, setTextInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.RECOMMENDED_READS_API_URL}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (textInput) {
      fetchData();
    }
  }, [textInput]);

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSearchResultClick = (result) => {
    // Implement logic for handling click on search result here
  };

  return (
    <NextUIProvider theme={darkTheme}>
    <div className="App">
      <div className="SearchBarContainer" style={{display:"flex", justifyContent:"center", 
        flexDirection: "column",
        alignItems: "center",    minHeight: "150px",
        maxHeight: "290px",
        height: "calc(100% - 800px)", marginTop:"20%"}}>
      <Input clearable bordered  initialValue="NextUI" 
      type="text"
      value={textInput}
      onChange={handleTextInputChange}
      labelPlaceholder="What kind of book would you like to read?"
      width="50%"
      css={{ minWidth:"400px", marginBottom:"15px"
    }}
      />
      
        <Button shadow color="gradient" auto >
          <SearchIcon/> Search
        </Button>
      </div>
      {searchResults.length > 0 && (
        <div className="SearchResultsContainer">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="SearchResult"
              onClick={() => handleSearchResultClick(result)}
            >
              <div className="SearchResultTitle">{result.title}</div>
              <div className="SearchResultDescription">
                {result.description}
              </div>
              
            </div>
          ))}
        </div>
       
      )}
      
    </div>
     </NextUIProvider>
  );
}

export default App;
