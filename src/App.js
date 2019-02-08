import React, { Component } from "react";
import "./App.css";
import MapContainer from "./Mapcontainer";


class App extends Component {
  render() {
    return (
<div>
            <div>
                <h1 className="geox">GEOX LA MAP QUI RESPIRE</h1>
                <hr/>
                <hr/>

            <div>
                <MapContainer className="MAP"/>

            </div>

            </div>

  </div>


    );
  }
}

export default App;