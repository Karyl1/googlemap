import React, { Component } from 'react';
import Marqueur from './Marker';

class Import extends Component {
    importJson = () => {
        fetch('http://192.168.15.94:8080/load?name=test.txt')
        .then(str => str.json())
        .then(res => {
            for(var i=0;i<res.length;i++){
                this.props.tab2.push(new Marqueur(res[i].nom, res[i].lat, res[i].lng));
            }
        
            this.props.callback();

        })
        // console.log(this.props.tab2);
    }
    render(){
        return(
            <div><button onClick={this.importJson} className="import">Import</button></div>
        );
    }
}

export default Import;