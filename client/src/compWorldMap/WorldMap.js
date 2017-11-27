/* global google */
import React from 'react';
import "./WorldMap.css";
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView } from 'react-google-maps';
let WorldMapStyles = require('./WorldMapStyles.json');

const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  })


const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%`, width: '100%', border:'50px solid black', boxSizing:'border-box' }} />
    }),
    withScriptjs,
    withGoogleMap
)((props) => 
    <GoogleMap defaultZoom={3} defaultCenter={{ lat: 20, lng: 0 }} defaultOptions={{ styles: WorldMapStyles }} >
        {props.ships.map(ship => {
                return (           
                <OverlayView className="custom-ship-marker" position={{ lat: ship.position[0], lng: ship.position[1] }} mapPaneName={OverlayView.FLOAT_PANE} getPixelPositionOffset={getPixelPositionOffset}>
                <div className="custom-ship-marker">
                    <img src="./radar-dot.png" />
                </div>
                </OverlayView>
                )
        })} 
    </GoogleMap>
);




class WorldMap extends React.Component {
    render() {
        return(
                <MyMapComponent ships={this.props.ships}/>
        )
    }
}

export default WorldMap;