import React, { Component } from 'react';
import Swal from 'sweetalert2';

// Permet de remplacer tout les caractères accentués par des caractères non accentués
class Export extends Component{
    sansAccent = (str) => {
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
    
        for(var i = 0; i < accent.length; i++){
            str = str.replace(accent[i], noaccent[i]);
        }
    
        return str;
    }

    exportJson = () => {
        Swal.fire({title: "Quel est mon nom ?", 
        input: "text",
        preConfirm: (save) => {
            if(save !== null){
            fetch('http://192.168.16.102:8080/save?name=' + this.sansAccent(save.toLowerCase()) + '.txt',{
                method: 'POST',
                body: JSON.stringify(this.props.jsonSave)
            })
            .then(data=>data)
            .then(res=>{console.log(res)})
            .then(res=>{console.log(JSON.stringify(this.props.jsonSave))})
            .catch(error=>{console.log(error)})
        }}})};
    // ***************** Alternative sans SweatAlert2 ***************** //
    // }); // Save le fichier demandé par l'utilisateur
    //        let file = prompt("Quel est mon nom ?");
    // //     if(file !== null){
    // //     fetch('http://192.168.16.102:8080/save?name=' + this.sansAccent(file.toLowerCase()) + '.txt',{
    // //         method: 'POST',
    // //         body: JSON.stringify(this.props.jsonSave)
    // //     })
    // //     .then(data=>data)
    // //     .then(res=>{console.log(res)})
    // //     .then(res=>{console.log(JSON.stringify(this.props.jsonSave))})
    // //     .catch(error=>{console.log(error)})
    // // }} // Envoie en string le tableau en format JSON
    render(){
        return(
            <div>
            <button onClick={this.exportJson} className="export">Sauvegarder</button>
            </div>
        )
    }
}

export default Export;
