import React, { Component } from "react";
import "./App.css";
import MapContainer from "./Mapcontainer";


class App extends Component {
  render() {
    return (
<div>
             <div>
                <h1 className="TitrePage" id="scroll_up">AtlasMap</h1>
                

            <div className="Page">
                <MapContainer className="MAP"/>

            </div>
                <a className="scroll_down" href="#scroll_down"><span role="img" aria-label="Arrow down">⏬</span></a>
                <a className="scroll_up" href="#scroll_up"><span role="img" aria-label="Arrow up">⏫</span></a>
            </div>

  </div>


    );
  }
}

export default App;