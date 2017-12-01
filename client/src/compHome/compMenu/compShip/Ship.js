import React from 'react';
import './Ship.css';

class Ship extends React.Component{
    render() {
        let colorClass = "ship-color";
        return(
                <div className="ship-card-positioner">
                    <div className="ship-card-container">
                        <div className={colorClass}></div>
                        <p className="ship-name">M. V. Queen of Chittagong</p>
                        <div className="ship-card-controls">
                            <button className="icon-btn">Details</button>
                            <button className="icon-btn">Edit</button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Ship;