import React, { Component } from 'react';

class Export extends Component{
    exportJson = () => {
        fetch('http://192.168.15.94:8080/save?name=test.txt',{
            method: 'POST',
            body: JSON.stringify(this.props.tab)
        })
        .then(data=>data)
        .then(res=>{console.log(res)})
        .catch(error=>{console.log(error)})
    }
    render(){
        return(
            <div>
            <button onClick={this.exportJson} className="export">Export</button>
            </div>
        )
    }
}

export default Export;