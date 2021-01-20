import React, { useState, useEffect } from "react";
import { sendRequest } from "./utils.js";
import NameList from './components/nameList';


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
      <NameList names={names} />
    </div>
  )

}

export default App;