import React, { Component } from "react";
import "./App.css";

class MarkerConfig extends Component    {
    constructor(props){
        super(props)
    }


    render() {

        return (
            <div className="MarkerConfig">
                <ul>
                    <li><h3>id: {this.props.laat}</h3></li>
                </ul>

                <div>
                    <input type="text"/>
                    <input type="text"/>
                </div>

                <button onClick={this.props.delete}>Supprimer ce markeur</button>
            </div>

        )
    }
}

export default  MarkerConfig;