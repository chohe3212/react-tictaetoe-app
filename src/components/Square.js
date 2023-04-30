import React from "react";
import "./Square.css";

             // 디스트럭쳐링 ?
const Square = ({onClick, value}) => { 

    return (
        // JSX문법
        <button className="square"
            onClick={(onClick)} >
            {value}
        </button>
    )
}

export default Square