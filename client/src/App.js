import React, { Component } from 'react';
import './App.css';
import './animate.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

//Import Components
import StarrySpace from './StarrySpace';
import Auth from './compAuth/Auth';
import Home from './compHome/Home';

class App extends Component {
  constructor(){
    super()
    this.state = {
      serverAddress: 'http://localhost:8080',
      page: "login",
      loggedIn: false,
      user: "protik"
    }
  }

//Auth Functions
handleSignIn = (username, password) => {
  axios.post(this.state.serverAddress + '/signin', {
    username: username,
    password: password})
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
}

handleSignUp = (username, password) => {
  axios.post(this.state.serverAddress + '/signup', {
    username: username,
    password: password})
    .then(response => {
      // console.log(response.data.code);
      if (response.data.code === 11000) {
        console.log("User name taken.");
      } else {
        console.log("New user created");
      }
    })
    .catch(error => {
      console.log(error);
    })
}


//Render and Delete Globe
renderGlobe = () => {
  const globeContainer = document.createElement("div");
  globeContainer.id = "globe-container"
  globeContainer.style = "width: 40vw; height: 40vh; background: transparent; z-index: 1; position: fixed; top: -20vh; left: 20vw; display: flex; justify-content: space-around;"
  document.getElementById("app-container").appendChild(globeContainer);

  const canvas = document.createElement("canvas");
  canvas.id = "rotatingGlobe";
  canvas.style = 'cursor: move; background-color:transparent; z-index: 0';
  document.getElementById("globe-container").appendChild(canvas);

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "./planet.js";
  document.body.appendChild(script);

  let colors = ['red', 'yellow', 'white', 'orange', 'green', 'cyan', 'pink'];
  // let ships = this.state.ships;
  setInterval(function() {
      // for (let i = 0; i < ships.length; i++) {
        var color = colors[Math.floor(Math.random() * colors.length)];
        var lat = Math.random() * 170 - 85;
        var lng = Math.random() * 360 - 180;
        window.pGlobe.plugins.pings.add(lng, lat, { color: color });
      // }
  }, 500);
}

deleteGlobe = () => {
  document.getElementById("globe-container").removeChild(document.getElementById("rotatingGlobe"));
  document.body.removeChild( document.getElementById("globe-container"));
}

componentDidMount() {
  this.renderGlobe();
}

render() {
    if (!this.state.loggedIn) {
      return (
        <Router>
        <div className="App">
        <StarrySpace />
            <div className = "app-container" id="app-container">
              <Switch>
                <Route path="/signin" render={(props) => 
                        <Auth page="this.state.page" history={props.history} match={props.match} handleSignIn={this.handleSignIn}/>
                  } />
                <Route path="/signup" render={(props) => 
                        <Auth page="this.state.page" history={props.history} match={props.match} handleSignUp={this.handleSignUp}/>
                  } />
                <Redirect to="/signin"/>
              </Switch>
            </div>
        </div>
        </Router>
      );
    } else {
      return (
        <Router>
        <div className="App">
        <StarrySpace /> 
          <div className = "app-container">
          <Route exact path="/" render={(props) => 
                <Home page="this.state.page" history={props.history} />
          }/> 
          </div>
        </div>
        </Router>
      )
    }
  }
}

export default App;
