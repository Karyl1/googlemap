import React, { Component } from 'react';

// Permet de remplacer tout les caractères accentués par des caractères non accentués
String.prototype.sansAccent = function(){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
     
    var str = this;
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
     
    return str;
}

class Export extends Component{
    exportJson = () => {
        let file = prompt("what's my name ?"); // Save le fichier demandé par l'utilisateur
        fetch('http://192.168.15.94:8080/save?name=' + file.toLowerCase().sansAccent() + '.txt',{
            method: 'POST',
            body: JSON.stringify(this.props.jsonSave)
        })
        .then(data=>data)
        .then(res=>{console.log(res)})
        .catch(error=>{console.log(error)})
    } // Envoie en string le tableau en format JSON
    render(){
        return(
            <div>
            <button onClick={this.exportJson} className="export">Export</button>
            </div>
        )
    }
}

export default Export;