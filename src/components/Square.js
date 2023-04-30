import React from "react";
import "./Square.css";

export class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value : null,
        }
    }

    render() {
        return (
            // JSX문법
            <button className="square" onClick={ () => {this.setState({value : 'X'})}} >
                {this.state.value}
                { /* 이렇게 데이터를 전달할 때는 props를 사용한다. */ }

            </button>
        )
    }
}