import React from 'react';
import Swal from 'sweetalert2';

const apiKey ="AIzaSyA3Gsj08QzmXalEyHuuHgnzNKk4dGS6i84"
const polyline = require('@mapbox/polyline')
// necessite 'npm install @mapbox/polyline'


export default class Itineraire extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            distance: null,
            selected: 'driving'
                }
    }

    alert = () => {
        Swal.fire({type: 'info', text : "Cliquez sur le premier et le dernier marqueur de votre parcours, puis appuyez sur le bouton 'Nouvel itinéraire' pour crée un itinéraire"})
    }

    getPosition = (e) => {
        e.preventDefault()
 
        const origin = this.props.origin
        const destination = this.props.destination
         
        if (origin !== null && destination !== null){
            const latO= origin.position.lat
            const lngO= origin.position.lng

            const latD = destination.position.lat
            const lngD = destination.position.lng

            fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${latO},${lngO}&destination=${latD},${lngD}&key=${apiKey}&mode=${this.state.selected}`)
            .then(res => res.json())
            .then(data => {
                if (data.routes.length !== 0) {
                        console.log(data.routes.length, 'data')
                    this.setState({
                    
                        distance: data.routes[0].legs[0].distance.text
                    })
                    const decode = polyline.decode(data.routes[0].overview_polyline.points)
                    console.log(decode)
                    this.props.tracerItin(decode)
                }
                else{
                    if (this.state.selected === 'driving' )
                        Swal.fire({title : "Erreur !", type: "error", text : `Impossible d'aller vers cette destination en voiture` });
                    if (this.state.selected === 'walking' )
                        Swal.fire({title : "Erreur !", type: "error", text : `Impossible d'aller vers cette destination à pied` });
                    if (this.state.selected === 'bicycling' )
                        Swal.fire({title : "Erreur !", type: "error", text : `Impossible d'aller vers cette destination à vélo` });
                }  
            })

        }
   
    }

    render(){
        return(
            <div>
                
                <div className="infoDistance">
                    <p className="textDistance">Distance des deux points : {this.state.distance}  </p>
                    <form>
                        <div className="helpDistance">
                        <button className="buttonDistance" onClick={this.getPosition}>Nouvel itinéraire</button>
                    <p className="questionDistance" onClick={this.alert} title="Cliquez sur le premier et le dernier marqueur de votre parcours, puis appuyez sur le bouton 'Nouvel itinéraire' pour crée un itinéraire"><span role="img" aria-label="Question">❔</span></p>
                    
                        <label>
                        <input type='radio' id='driving' name='driving' value='driving'
                    checked={this.state.selected === 'driving'} onChange={(e) => 
                    this.setState({ selected: e.target.value })} />Voiture</label>
                        <label><input type='radio' id='walking' name='myRadio' value='walking' 
                        checked={this.state.selected === 'walking'} onChange={(e) => this.setState({ selected: e.target.value })} />À pied</label>
                        <label><input type='radio' id='bicycling' name='myRadio' value='bicycling' 
                    checked={this.state.selected === 'bicycling'} onChange={(e) => this.setState({ selected: e.target.value })} />À vélo</label>
                    </div>
                    </form>
                </div>
            </div>
        )
    }

}
