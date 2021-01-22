import React, { useState, useEffect } from "react";
import { sendRequest } from "./utils.js";
import NameList from './components/nameList';
import SearchBar from "./components/searchBar.jsx";
import Total from "./components/total.jsx";


const App = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    sendRequest("/all", "", "get")
    .then((response) => {
      console.log(response.data);
      setNames(response.data)
    })
    .catch((error) => {
      console.log(error.message);
    })

  }, []);

  return (
    <div>
      <Total names={names}/>
      <SearchBar/>
      <NameList names={names} />
    </div>
  )

}

export default App;
