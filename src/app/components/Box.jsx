import React from "react";
import box from "../styles/Box.module.css";
const Box = (props) => {
  return (
    <div className={box.box} style={props.style}>
      {props.children}
    </div>
  );
};

export default Box;
