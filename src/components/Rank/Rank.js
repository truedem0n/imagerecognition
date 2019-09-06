import React, { Component } from "react";

class Rank extends Component {
  render() {
    let {name,entries}=this.props
    return (
      <div className="mt7">
        <p className="white f3 mt5">{name}, your entry count is..</p>
        <h4 className="f2 mt1 white">#{entries}</h4>
      </div>
    );
  }
}

export default Rank;
