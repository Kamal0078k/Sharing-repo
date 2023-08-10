import React from "react";
import { Link } from "react-router-dom";
import send from "./../assets/send.png";
import recieve from "./../assets/receive.png";
import circle from "./../assets/circle.svg";
import circle1 from "./../assets/circle1.svg";
import share from "./../assets/share.png";

const Option = () => {
  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center justify-center relative">
        <img
          src={circle}
          alt=""
          className="absolute h-[10rem] left-[5%] top-[23%] md:top-[18%] md:h-[20rem] md:left-[10%] lg:left-[18%] xl:left-[26%] blur-lg opacity-60 shadow-2xl"
        />
        <img
          src={circle1}
          alt=""
          className="absolute top-[60%] left-[70%] md:top-[56%] h-[5rem] md:h-[10rem]  md:left-[54%] blur-lg opacity-60"
        />
        <div className="flex flex-col gap-4 justify-center items-center bg-gradient-to-br px-10 py-10 from-[rgba(255,255,255,0.2)] to-[rgba(0,0,0,0.03)]  rounded-2xl backdrop-blur-xl  z-10 absolute">
          <img src={share} className="h-12" />
          <div className="font-anton text-[#3c3c3c] ">METAFORA</div>
          <hr className="h-2 w-20 mb-1 -mt-4"></hr>
          <button className="bg-[#ffffff] w-44 h-12 rounded-xl font-pops text-xl ">
            <Link to="/send">Send</Link>
          </button>
          <button className="bg-[#ffffff] w-44 h-12 rounded-xl text-xl font-pops">
            <Link to="/receive">Receive</Link>
          </button>
        </div>
      </div>
    </>
    // <div className="h-screen w-screen bg-[#eae8f2] flex flex-col items-center justify-center ">
    //   <div className="flex flex-col items-center justify-center bg-[#ffffff] w-64 rounded-xl py-10 shadow-lg	">
    //     <button className="bg-[#f4f4f4] w-40 rounded-xl hover:bg-[#fc6b68] active:bg-[#fc6b68] npm focus:bg-[#fc6b68]  hover:text-[#ffffff] active:shadow-xl active:text-[#ffffff] hover:shadow-xl text-2xl py-3">
    //       <Link to="/send">Send</Link>
    //     </button>
    //     <button className="bg-[#f4f4f4] w-40 rounded-xl hover:bg-[#fc6b68] mt-5  hover:text-[#ffffff] hover:shadow-xl text-2xl py-3">
    //       <Link to="/receive">Receive</Link>
    //     </button>
    //   </div>
    // </div>
  );
};

export default Option;
