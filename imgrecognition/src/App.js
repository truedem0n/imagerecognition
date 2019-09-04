import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
const app = new Clarifai.App({
  apiKey: "57ae1726336f40c097f3d14ece7e8392"
});
const parmOption = {
  particles: {
    number: {
      value: 100
    },
    size: {
      value: 3
    }
  }
};
const initialState = {
  draw: false,
  box: [{ top: 0, left: 0, bottom: 0, right: 0 }],
  inputUrl: "",
  route: "signin",
  isSignedIn: false,
  users: {
    id: 0,
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      draw: false,
      box: [{ top: 0, left: 0, bottom: 0, right: 0 }],
      inputUrl: "",
      route: "signin",
      isSignedIn: false,
      users: {
        id: 0,
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    };
  }
  loadUser = data => {
    this.setState({ users: data });
  };

  onInput = event => {
    this.setState({
      draw: false,
      box: [{ top: 0, left: 0, bottom: 0, right: 0 }],
      inputUrl: event.target.value
    });
  };
  onRouteChange = route => {
    
    this.setState({ route: route });
    if (route === "home") {
      this.setState({ isSignedIn: true, route: route });
    } else {
      this.setState(Object.assign({}, initialState, { isSignedIn: false,route:route }));
    }
    console.log("Input",route,"State",this.state.route);
  };
  calculateFaceLocation = e => {
    const img = document.getElementById("inputImg");
    const width = Number(img.width);
    const height = Number(img.height);

    for (let i = 0; i < e.rawData.outputs[0].data.regions.length; i++) {
      let top, left, bottom, right, ev;
      ev = e.rawData.outputs[0].data.regions[i].region_info.bounding_box;
      top = ev.top_row * height;
      left = ev.left_col * width;
      bottom = height - ev.bottom_row * height;
      right = width - ev.right_col * width;
      if (!i) {
        this.setState({
          box: [{ top: top, left: left, bottom: bottom, right: right }],
          draw: true
        });
      } else {
        this.setState(prevState => ({
          box: [
            ...prevState.box,
            { top: top, left: left, bottom: bottom, right: right }
          ],
          draw: true
        }));
      }
    }
  };
  onSubmit = event => {
    let ref = this.state;
    // var res;
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.inputUrl)
      .then(response => {
        this.calculateFaceLocation(response);
        if (response) {
          async function updateEntres(url) {
            try {
              const response = await fetch(url, {
                method: "put",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  id: ref.users.id
                })
              });
              let res = await response.json();
              Object.assign(ref.users, { entries: res });
            } catch (e) {
              console.log(e);
            }
          }
          updateEntres("http://localhost:3001/image");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="App">
        <Particles className="particleClass" params={parmOption} />
        <div className="componentsC">
          <Navigation
            onRouteChange={this.onRouteChange}
            isSignedIn={this.state.isSignedIn}
          />
          <Logo />
          {this.state.route === "signin" ? (
            <SignIn
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : (
            <div />
          )}
          {this.state.route === "home" ? (
            <div>
              <Rank
                name={this.state.users.name}
                entries={this.state.users.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInput}
                onSubmit={this.onSubmit}
              />

              <FaceRecognition
                imgUrl={this.state.inputUrl}
                boxD={this.state.box}
                shouldD={this.state.draw}
              />
            </div>
          ) : (
            <div />
          )}
          {this.state.route === "register" ? (
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

export default App;
