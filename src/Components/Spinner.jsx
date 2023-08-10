import React from "react";
import "./Spinner.css";

const Spinner = (props) => {
  var size = props.size;
  return (
    <div className="showbox">
      <div className="loader" style={{ width: size + "px" }}>
        <svg className="circular" viewBox="25 25 50 50">
          <circle
            cx={50}
            cy={50}
            r={20}
            fill="none"
            stroke={props.color}
            strokeWidth={props.thickness}
            strokeMiterlimit={10}
            className="path"
          />
        </svg>
      </div>
    </div>
  );
};

export default Spinner;
