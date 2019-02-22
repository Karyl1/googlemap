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
                {/* <ul className="githubFooter">
                  <li><a href="https://github.com/Karyl1"><img className="githubLogo" src="https://avatars3.githubusercontent.com/u/45764416?s=460&amp;v=4"/></a></li>
                  <li><a href="https://github.com/ArnaudMoya"><img className="githubLogo" src="https://avatars3.githubusercontent.com/u/44874070?s=460&amp;v=4"/></a></li>
                  <li><a href="https://github.com/Ciszowski"><img className="githubLogo" src="https://avatars3.githubusercontent.com/u/45790380?s=460&amp;v=4"/></a></li>
                </ul> */}
                <a className="scroll_down" href="#scroll_down"><span role="img" aria-label="Arrow down">⏬</span></a>
                <a className="scroll_up" href="#scroll_up"><span role="img" aria-label="Arrow up">⏫</span></a>
            </div>

  </div>


    );
  }
}

export default App;