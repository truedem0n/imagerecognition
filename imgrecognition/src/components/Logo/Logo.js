import React from "react";
import Tilt from "react-tilt";
import brain from "../../img/brain.png";

const Logo = () => {
  return (
    <div className="ma4 mt0 pa0" >
      <Tilt
        className="Tilt br2 shadow-2 pa0"
        options={{ max: 55 }}
        style={{ height: 150, width: 150,position:"absolute"}}
      >
        <div className="Tilt-inner">
          <img
            style={{ height: 100 }}
            className="pt3 mt1"
            src={brain}
            alt="logo"
          ></img>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
