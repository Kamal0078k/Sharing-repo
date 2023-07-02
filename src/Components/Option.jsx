import React from "react";
import { Link } from "react-router-dom";
import send from "./../assets/send.png";
import recieve from "./../assets/receive.png";

const Option = () => {
  return (
    <div className="h-screen w-screen bg-[#eae8f2] flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center bg-[#ffffff] w-64 rounded-xl py-10 shadow-lg	">
        <button className="bg-[#f4f4f4] w-40 rounded-xl hover:bg-[#fc6b68] active:bg-[#fc6b68] npm focus:bg-[#fc6b68]  hover:text-[#ffffff] active:shadow-xl active:text-[#ffffff] hover:shadow-xl text-2xl py-3">
          <Link to="/send">Send</Link>
        </button>
        <button className="bg-[#f4f4f4] w-40 rounded-xl hover:bg-[#fc6b68] mt-5  hover:text-[#ffffff] hover:shadow-xl text-2xl py-3">
          <Link to="/receive">Receive</Link>
        </button>
      </div>
    </div>
  );
};

export default Option;
