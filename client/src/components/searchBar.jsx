import React, { useState } from "react";
import { sendRequest } from "../utils.js";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";


const SearchBar = () => {

    const [searched, setSearched] = useState();
    const [params, setParams] = useState();
    const [anchorEl, setAnchorEl] = useState(null);

    const onSubmit = () => {
         sendRequest(`/find/${params}`, "", "get")
        .then((response) => {
            console.log(response.data)
            setSearched(response.data)
        })
        .catch((error) => {
            console.log(error.message);
        })
    }

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    return (
        <div>
            <Input placeholder="Search" onChange={(e) => setParams(e.target.value)}></Input>
            <Button type="button" onClick={(event) => { 
                onSubmit()
                handleClick(event)}}>Search
            </Button>
            <Popper id={id} anchorEl={anchorEl} open={open}>
                {searched ? 
                    searched.map((item) => 
                        <div key={item.name}>The name {item.name} occurs {item.amount} times</div>
                    )
                    :
                    <div>The name was not found</div>
                }
            </Popper>

        </div>
    )
}

export default SearchBar;