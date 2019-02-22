import React, {Component} from 'react';

class Liste extends Component {
    ls = () => {
        fetch('http://192.168.15.94:8080')
        .then(data => data)
        .then(str => {
            console.log(str);
        })
    }
    render(){
        return(
            <button onClick={this.ls} className="liste">Liste</button>
        )
    }
}

export default Liste;