import React, { Component } from "react";
import "./App.css";

class MarkerConfig extends Component    {
    constructor(props){
        super(props)
        
        this.img="";
        this.text="";
        this.titre= "";
        this.number=0;
    }
 toto = () => {
    this.titre = document.getElementById("titre").value
    this.text = document.getElementById("inputxt").value
    this.img = document.getElementById("inputClick").value
    this.number = 1;


    this.props.add(this.titre,this.text,this.img,this.number)
 }
 

    render() {
/**<li><input placeholder="https://votre-image.exemple" value={this.state.img} onChange={i => this.setState({img: i.target.value})}  */
        return (
            <div className="MarkerConfig">
                <ul>
                    <li><h3>Markeur ID: {this.props.laat} <button className="buttondelete" onClick={this.props.delete}>Supprimer ce markeur</button></h3></li>
                </ul>
                
                <div>
                    <ul>
                        <h2>Titre</h2>
                        <li> <input placeholder="Votre titre..."    id="titre"/></li>
                        <br/>
                        <br/>   
                        <h2>Texte</h2>
                        <li><textarea placeholder="Votre texte..."    id="inputxt"></textarea></li>
                        <br/>
                        <h2>image (HTML)</h2>
                        <li><input placeholder="https://votre-image.exemple" id="inputClick"   type="text"/></li>
                       
                        <input onClick={this.toto}  type="submit" value="Envoyer"/>
                    </ul>
                </div>

               
            </div>

        )
    }
}

export default  MarkerConfig;