import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import Rank from "./components/Rank/Rank"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import Particles from 'react-particles-js';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="App">
    <Particles className="particleClass"
    params={{
	    "particles": {
	        "number": {
	            "value": 100
	        },
	        "size": {
	            "value": 3
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        }
	    }
	}} />
    <Navigation/>
    <Logo/>
    <Rank/>
    <ImageLinkForm/>
    {/* <FaceRecognition/> */}
    </div>
     );
  }
}
 
export default App;
