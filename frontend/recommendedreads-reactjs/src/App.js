import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Link, createTheme } from "@nextui-org/react"
import { Input } from '@nextui-org/react';
import { NextUIProvider } from '@nextui-org/react';
import { Button } from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon"
import logo from './logo.png';
import HelpIcon from "./Helpcon";
import GithubIcon from "./GithubIcon";

const darkTheme = createTheme({
  type: 'dark',
  theme: {colors:{
     background: '#121212',

    gradient:  'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
    helpGradient: 'rgb(30, 30, 30)'
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
    <div className="App" >
      <div    style={{flexDirection: "column",
        alignItems: "center",  
        marginTop:"5%"}}>
        <img src={logo} alt="Logo" width="500px"/>
      </div>
      <div className="SearchBarContainer" style={{display:"flex", justifyContent:"center", 
        flexDirection: "column",
        alignItems: "center",    
        }}>
      
      <Input clearable bordered  initialValue="NextUI" 
      type="text"
      value={textInput}
      onChange={handleTextInputChange}
      labelPlaceholder="What kind of book would you like to read?"
      width="50%"
      css={{ minWidth:"400px", marginBottom:"15px"
    }}
    className="slide-top-left-corner"
  
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
     <div style={{position:"fixed", bottom:"5px", right:"5px"}}>
      <Button  css={{ background: '$helpGradient' }} auto >
          <HelpIcon/> 
        </Button>
        </div>
        <div style={{position:"fixed", top:"5px", right:"5px"}}>
      <Button as="a" href="https://github.com/onursercanyilmaz" target="_blank" css={{ background: '$helpGradient' }} auto >
          <GithubIcon/> 
        </Button>
        </div>
    </div>
    
   
     </NextUIProvider>
  );
}

export default App;
