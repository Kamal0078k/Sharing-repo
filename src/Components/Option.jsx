import React from "react";
import { Link } from "react-router-dom";

const Option = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <div className="flex flex-col h-80 bg-red-100 w-52 items-center justify-center">
        <button>
          <Link to="/send">Send</Link>
        </button>
        <button>
          <Link to="/receive">Receive</Link>
        </button>
      </div>
    </div>
  );
};

export default Option;
