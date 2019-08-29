import React from "react";
var show = "none";
const FaceRecognition = ({ imgUrl, boxD, shouldD }) => {
  if (shouldD) {
    show = "block";
  } else {
    show = "none";
  }
  let creatediv = () => {
    let arr = [];
    for (let i = 0; i < boxD.length; i++) {
      arr.push(
        <div
          key={i}
          style={{
            display: show,
            position: "absolute",
            top: boxD[i].top,
            bottom: boxD[i].bottom,
            right: boxD[i].right,
            left: boxD[i].left,
            border: "2px solid blue"
          }}
        ></div>
      );
    }
    return arr;
  };
  return (
    <div className="center ma" style={{ position: "relative", width: "100%" }}>
      <div
        style={{
          width: "500px",
          height: "auto",
          margin: "0px auto",
          position: "relative"
        }}
        className="center ma"
      >
        <img
          id="inputImg"
          src={imgUrl}
          alt=""
          style={{ width: "500px", height: "auto", margin: "0px auto" }}
        ></img>
        {creatediv()}
      </div>
    </div>
  );
};

export default FaceRecognition;
