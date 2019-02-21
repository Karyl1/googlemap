
import React from 'react';
import { toGeoJSON } from '@mapbox/polyline';

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

    

    getPosition = (e) => {
        e.preventDefault()
 
        const origin = this.props.origin
        const destination = this.props.destination

            if (origin !== null && destination !== null) {
            const latO= origin.position.lat
            const lngO= origin.position.lng

            const latD = destination.position.lat
            const lngD = destination.position.lng

            fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${latO},${lngO}&destination=${latD},${lngD}&key=${apiKey}&mode=${this.state.selected}`)
            .then(res => res.json())
            .then(data => {
  
                this.setState({
                    
                    distance: data.routes[0].legs[0].distance.text
                })
                const decode = polyline.decode(data.routes[0].overview_polyline.points)
                console.log(decode)
                this.props.tracerItin(decode)

            })

        }
   
    }

    render(){

        return(
            
            <div>
                <p>Distance des deux points : {this.state.distance}  </p>
                <form  >
                    <button onClick={this.getPosition}>Nouvel itinéraire</button>
                    <label>
                    <input type='radio' id='driving' name='driving' value='driving'
                checked={this.state.selected === 'driving'} onChange={(e) => 
                this.setState({ selected: e.target.value })} />Voiture</label>
                    <label><input type='radio' id='walking' name='myRadio' value='walking' 
                     checked={this.state.selected === 'walking'} onChange={(e) => this.setState({ selected: e.target.value })} />À pied</label>
                    <label><input type='radio' id='bicycling' name='myRadio' value='bicycling' 
                checked={this.state.selected === 'bicycling'} onChange={(e) => this.setState({ selected: e.target.value })} />À vélo</label></form>
            
            </div>
        )
    }

}
