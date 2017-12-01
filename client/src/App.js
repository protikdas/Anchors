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
      authError: "",
      page: "login",
      loggedIn: false,
      moveGlobeUp: false,
      user: "",
    }
  }



// Auth Functions
isAuthenticated = () => {
  let token = localStorage.getItem("anchorsToken");
  if (token) {
    token = JSON.parse(token);
    const config = {
      headers: {Authorization: "bearer" + token.token}
    }
    axios.post(this.state.serverAddress + '/authenticate', {
    username: token.user,
    }, config)
    .then(response => {
      if (response.status === 200) {
        this.setState({
          loggedIn: true,
          user: response.data.sub
        })
      } else {
        this.setState({
          loggedIn: false,
          user: ""
        })
      }
    })
    .catch(error => {
      console.log(error);
      this.setState({
        loggedIn: false,
        user: ""
      })
    })

  }
}

handleSignIn = (username, password) => {
  axios.post(this.state.serverAddress + '/signin', {
    username: username,
    password: password})
    .then(response => {
      if (response.data === "Incorrect password.") {
        this.setState({
          authError: "Incorrect password. Please try again."
        })
      } else {
        let tokenToBeStored = {
          user: username,
          token: response.data
        }
        localStorage.setItem('anchorsToken', JSON.stringify(tokenToBeStored));
        this.setState({
          loggedIn: true,
          user: username,
        })
      }
    })
    .catch(error => {
      this.setState({
        authError: error
      })
    })
}

handleSignUp = (username, password) => {
  axios.post(this.state.serverAddress + '/signup', {
    username: username,
    password: password})
    .then(response => {
        if (response.data.code === 11000) {
          this.setState({
            authError: "Username unavailable. Please choose a different username."
          })
        } else {
          this.setState({
            authError: ""
          })
        }
      })
    .catch(error => {
      this.setState({
        authError: "Please choose a different username."
      })
    })
}

handleSignOut = () => {
  localStorage.removeItem("anchorsToken");
  this.setState({
      loggedIn: false,
      moveGlobeUp: true,
      user: ""
  })
}

 clearAuthError = () => {
  this.setState({
    authError: ""
  })
}


//Render and Delete Globe
renderGlobe = () => {
  const globeContainer = document.createElement("div");
  globeContainer.id = "globe-container"
  globeContainer.style = "width: 100vw; height: 100vh; background: transparent; z-index: 1; position: fixed; top: -30vh; left: -20vh; display: flex; justify-content: space-around; animation-fill-mode:forwards;"
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
  document.getElementById("app-container").removeChild( document.getElementById("globe-container"));
}

componentWillMount() {
  this.isAuthenticated();
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
                        <Auth renderGlobe={this.renderGlobe} clearError={this.clearAuthError} moveGlobeUp={this.state.moveGlobeUp} page="this.state.page" match={props.match} error={this.state.authError} handleSignIn={this.handleSignIn}/>
                  } />
                <Route path="/signup" render={(props) => 
                        <Auth renderGlobe={this.renderGlobe} clearError={this.clearAuthError} moveGlobeUp={this.state.moveGlobeUp} page="this.state.page" match={props.match} error={this.state.authError} handleSignUp={this.handleSignUp}/>
                  } />
                <Redirect to="/signin"/>
              </Switch>
            </div>
        </div>
        </Router>
      );
    } else {
      // this.deleteGlobe();
      return (
        <Router>
        <div className="App">
        <StarrySpace />
          <div className = "app-container" id="app-container"> 
          <Switch>
          <Route exact path="/" render={(props) => 
            <div className = "app-container">
                <Home renderGlobe={this.renderGlobe} moveInGlobe={this.state.moveInGlobe} user={this.state.user} isAuthenticated={this.isAuthenticated} signOut={this.handleSignOut} />
            </div>
          }/> 
          <Redirect to="/"/>
          </Switch>
          </div>
        </div>
        </Router>
      )
    }
  }
}

export default App;
