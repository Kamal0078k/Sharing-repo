import React from "react";
import { Link } from "react-router-dom";
import send from "./../assets/send.png";
import recieve from "./../assets/receive.png";

const Option = () => {
  return (
    <div className="h-screen w-screen bg-share flex flex-col items-center justify-center ">
      <div className="h-[90vh] w-[85vw]   xl:h-[90vh] xl:w-[95vw] sm:h-[90vh] sm:w-[93vw] border-2 rounded-xl flex flex-col justify-center items-center">
        <div className="w-20  sm:w-32     flex items-center justify-center">
          <Link to="/send">
            <img src={send} className="w-72  " />
          </Link>
        </div>
        <div className="w-32 sm:w-56     flex items-center justify-center">
          <Link to="/receive">
            <img src={recieve} className="w-96" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Option;
