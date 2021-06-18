import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    textInput: {
        alignSelf: 'center',
        height: "4vh",
        fontSize: "2.2vh",
        width: "25vw",
        border: 'none',
        borderBottom: '0.01em solid grey',
        outline: 'none',
    }
});

const TextInput = ({ isDay, searchValue, handleInput, handleSearch }) => {
    const classes = useStyles();
    return (
        <input
            type="text"
            value={searchValue}
            placeholder="Enter a Place"
            onKeyDown={handleSearch}
            onChange={handleInput}
            className={classes.textInput}
            style={{
                color: isDay ? 'black' : 'white',
                background: isDay ? '#76aeda' : '#000'
            }} />
    )
}

export default TextInput;