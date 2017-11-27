import React, { Component } from 'react';
import './App.css';
import './animate.css';

//Components
import WorldMap from './compWorldMap/WorldMap';

class App extends Component {
  constructor(){
    super()

    this.state = {
      ships: [
              {name: "Ocean Monarch", 
              position: [-33.137551 , 81.826172], 
              prePos: [0, 0]},
              {name: "Voyager", 
              position: [-33.137551 , 81.826172], 
              prePos: [0, 0]},
              {name: "Apollo 21", 
              position: [-33.137551 , 81.826172], 
              prePos: [0, 0]},
              {name: "XTC", 
              position: [-33.137551 , 81.826172], 
              prePos: [0, 0]}
              ],
      markerOpacity: 0
    }
    this.randomGPSGenerator = this.randomGPSGenerator.bind(this);
  }

randomGPSGenerator = function(start) {
    let lat = start[0];
    let lng = start[1];
    let ranLat = Math.random()*3;
    let ranLng = Math.random()*3;
    let posOrNegLat = Math.random() < 0.5 ? -1 : 1;
    let posOrNegLng = Math.random() < 0.5 ? 1 : -1;
    ranLat= +(posOrNegLat*ranLat).toFixed(3);
    ranLng= +(posOrNegLng*ranLng).toFixed(3);
    return [lat+ranLat, lng+ranLng];
}

componentDidMount() {
  setInterval(() => {
    let shipsCopy = Array.from(this.state.ships);
    for (let i = 0; i < shipsCopy.length; i++) {
      shipsCopy[i].prePos = shipsCopy[i].position;
      shipsCopy[i].position = this.randomGPSGenerator(shipsCopy[i].prePos);
    }
    this.setState({
      ships: shipsCopy
    })
  }, 2000)
}


render() {
    return (
      <div className="App">
        <div className = "app-container">
          <div className = "world-map">
            <WorldMap markerOpacity={this.state.markerOpacity} ships={this.state.ships} />
          </div> 
        </div>
      </div>
    );
  }
}

export default App;
