import React from 'react';
import './NewShip.css';


class NewShip extends React.Component {
    constructor() {
        super()

        this.state = {
            shipname: "",
            homeport: "",
            basePos: [0, 0]
        }
    }

    handleChange = (e) => {
        if (e.target.placeholder === "Ship Name") {
            this.setState({
                shipName: e.target.value
            })
        } else if (e.target.placeholder === "Home Port" ) {
                homeport: e.target.value;
        } else if (e.target.placeholder === "Lng") {
                let oldPos = Array.from(this.state.basePos);
                basePos: [parseInt(e.target.value), oldPos[1]]
        } else if (e.target.placeholder === "Lat") {
                let oldPos = Array.from(this.state.basePos);
                basePos: [oldPos[0], parseInt(e.target.value)]
        }
    }

    newShipToggle = (e) => {
        e.preventDefault();
        this.props.newShipToggle();
    }
 
    handleShipSubmit = (e) => {
        e.preventDefault();
        this.props.handleShipSubmit(this.state.shipname, this.state.homeport, this.state.basePos);
    }

    render(){
        return(
            <div className="new-ship-form-positioner">
                <div className="new-ship-form-container">
                    <form className="new-ship-form">
                        <span className="new-ship-head">
                        <div className="new-ship-header">New Ship</div>
                        <button className="new-ship-cancel" onClick={this.newShipToggle}>x</button>
                        </span>
                        <input className="new-ship-input" placeholder="Ship Name" onChange={this.handleChange}/>
                        <input className="new-ship-input" placeholder="Home Port" onChange={this.handleChange}/>
                        <input className="new-ship-input" placeholder="Lng" onChange={this.handleChange}/>
                        <input className="new-ship-input" placeholder="Lat" onChange={this.handleChange}/>
                        <button className="new-ship-btn" onClick={this.handleShipSubmit}>Add Ship!</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewShip;