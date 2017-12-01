import React from 'react';
import './Menu.css';

import Ship from './compShip/Ship';

class Menu extends React.Component {
    render() {
        return(
            <div className="menu-positioner">
                <div className="menu-container">
                    <div className="user-info">
                        <p className="user-text">{this.props.user}</p>
                        <button className="sign-out-button" onClick={()=>{this.props.signOut()}}>Sign Out</button>
                    </div>
                    <div className="ship-list-head">
                            <button id="add-ship" onClick={this.props.newShipToggle}>&#10011;</button>
                            <div className="ship-list-header">Vessels</div>
                    </div>
                    <div className="ship-section">
                        <div className="ship-list-scroller">
                            <Ship />
                            <Ship />
                            <Ship />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}  

export default Menu