import React from "react";
import "./ImageLinkForm.css";
const ImageLinkForm = () => {
  return (
    <div className="containerF pa3 br3">
      <p className="white f3">
        This magic brian will detect faces in your pictures. Give it a try.
      </p>
      <div style={{display:"flex",flexWrap:"wrap"}} className="contaierforIB">
        <input
          className="w-70 pa2"
          type="text"
          placeholder="url to the image"
        ></input>
        <button className="w-30 pa2 grow pointer bg-red br3">Detect</button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
