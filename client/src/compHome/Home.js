import React from 'react';
import './Home.css';
import Menu from './compMenu/Menu';
import NewShip from './compNewShip/NewShip';

class Home extends React.Component {
    constructor() {
        super()

        this.state = {
            newShip: false,
            globe: true,
            atlas: false
        }
    }

    newShipToggle = () => {
        let newShipCheck = this.state.newShip;
        this.setState({
            newShip: !newShipCheck
        })
    }

    componentWillMount() {
        this.props.isAuthenticated();
    }

    componentDidMount() {
        if (!document.getElementById("globe-container")) {
            this.props.renderGlobe();
        }
        let globeContainer = document.getElementById("globe-container");
        let computedStyle = window.getComputedStyle(globeContainer);
        globeContainer.classList.remove("moveOutGlobe");
        globeContainer.classList.add("moveInGlobe");
    }

    render() {
        let newShipJSX = "";
        if (this.state.newShip) {
            newShipJSX = 
                <NewShip newShipToggle={this.newShipToggle}/>
        }
        return(
            <div className="home-container">
                <Menu newShipToggle={this.newShipToggle} user={this.props.user} signOut={this.props.signOut} />
                { newShipJSX }
            </div>
            
        )
    }
}

export default Home;