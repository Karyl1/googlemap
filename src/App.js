import React, { Component } from "react";
import "./App.css";
import MapContainer from "./Mapcontainer";


class App extends Component {
  render() {
    return (
<div>
            <div>
                <h1 className="TitrePage">GEOX LA MAP QUI RESPIRE</h1>


            <div className="Page">
                <MapContainer className="MAP"/>

            </div>

            </div>

  </div>


    );
  }
}

export default App;