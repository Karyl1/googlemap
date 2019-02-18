import React from 'react'

export default class Poly {
    constructor(lat1,lng1,lat2,lng2){
        this.coord=[];
        this.coord.push({lat:lat1,lng:lng1});
        this.coord.push({lat:lat2,lng:lng2});
    
    }
}

