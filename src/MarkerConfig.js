import React, { Component } from "react";
import "./App.css";

class MarkerConfigxxx extends Component    {
    constructor(props){
        super(props)
    }


    render() {

        return (
            <div className="culcul">
                <h3>titi:{this.props.laat}</h3>
                <h3>lng:</h3>
                <h3>lat:{this.props.lat}</h3>
                <button onClick={this.props.delete}>Supprimer ce markeur</button>

            </div>)
    }
}

export default  MarkerConfigxxx;