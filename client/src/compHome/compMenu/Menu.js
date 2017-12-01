import React from 'react';
import './Menu.css';

class Menu extends React.Component {
    render() {
        return(
            <div className="menu-positioner">
                <div className="menu-container">
                    <div className="user-info">
                        <p className="user-text">{this.props.user}</p>
                    </div>
                    <div className="ship-list">
                        <button id="add-ship" onClick={this.props.newShipToggle}>Add Ship</button>
                    </div>
                    <div className="control-panel">
                        <button id="signout" onClick={()=>{this.props.signOut()}}>Sign Out</button>
                    </div>
                </div>
            </div>
        )
    }
}  

export default Menu