
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
       
Migrer votre infrastructure sur Linux va nécessiter du temps et une planification méticuleuse : nous vous conseillons de ne pas attendre le dernier moment. Même si cela vous semble être une opération colossale, nous sommes là pour vous y aider tout en minimisant les risques et la complexité.  
        if (origin !== null && destination !== null){
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

    test = () => {
        this.state({selected:'bycycling'}) 
        this.position()
    }


    render(){

        return(
            <div>
               
                <h1 style={{color: 'white'}}> la Distance entre ces deux points est de {this.state.distance} </h1>
                <form onChange={this.getPosition} onSubmit={this.getPosition}>
                    <label>
                    <input type='radio' id='driving' name='driving' value='driving'
                checked={this.state.selected === 'driving'} onChange={(e) => 
                this.setState({ selected: e.target.value })
                
                } />
                        driving
                    </label>
                    <label>
                    <input type='radio' id='walking' name='myRadio' value='walking' 
                     checked={this.state.selected === 'walking'} onChange={(e) => this.setState({ selected: e.target.value })} />
                        walking
                    </label>
                    <label>
                    <input type='radio' id='bycycling' name='myRadio' value='bycycling' 
                checked={this.state.selected === 'bycycling'} onChange={(e) => this.setState({ selected: e.target.value })} />
                        Bicycling
                    </label>
                    <button >test new position</button>
  
                </form>
     
            </div>
        )
    }

}
