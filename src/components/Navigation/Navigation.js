import React from "react";

const Navigation = ({ onRouteChange , isSignedIn }) => {
     if(isSignedIn){
    return(
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p
        onClick={() => onRouteChange("signin")}
        className="f3 link dim black underline pa2 pointer"
        style={{ zIndex: "1" }}
      >
        Sign Out
      </p>
    </nav>)
    }
    else{
      return(
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => onRouteChange("signin")}
            className="f3 link dim black underline pa2 pointer"
            style={{ zIndex: "1" }}
          >
            Sign In
          </p>
          <p
            onClick={() => onRouteChange("register")}
            className="f3 link dim black underline pa2 pointer"
            style={{ zIndex: "1" }}
          >
            Register
          </p>
        </nav>)
    }
  }

export default Navigation;
