import React, { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import circle1 from "./../assets/circle1.svg";
import Peer from "peerjs";
import circ from "./../assets/sendcirc.svg";
import receiver from "./../assets/receiver.png";
import Spinner from "./Spinner";

const Receive = () => {
  const [receiverId, setReceiverID] = useState(null);
  const [receiving, setReceiving] = useState(false);
  const [receivedFile, setReceivedFile] = useState([]);

  const [progress, setProgress] = useState(null);

  const [receivedName, setReceivedName] = useState([]);
  useEffect(() => {
    var peer = new Peer();

    peer.on("open", function (id) {
      setReceiverID(id);
      console.log(id);
    });

    peer.on("connection", (conn) => {
      var chunk = [];
      conn.on("data", (data) => {
        if (data) {
          setReceiving(true);
        }
        chunk = [...chunk, data.file];
        setProgress(data.progress);
        if (data.progress == 100) {
          console.log(data);
          combineTheChunks(chunk);
          chunk = [];
          setProgress(0);
          setReceivedName((prevname) => [...prevname, data.name]);
        }
      });
    });
  }, []);

  const combineTheChunks = (chunks) => {
    const totalLength = chunks.reduce(
      (length, chunk) => length + chunk.byteLength,
      0
    );
    const combined = new Uint8Array(totalLength);
    let offset = 0;

    chunks.forEach((chunk) => {
      combined.set(new Uint8Array(chunk), offset);
      offset += chunk.byteLength;
    });

    console.log(combined.buffer);

    const uint8Array = new Uint8Array(combined.buffer);
    const blob = new Blob([uint8Array]);
    const file = new File([blob], `received`);
    setReceivedFile((prevrec) => [...prevrec, file]);
    setReceiving(false);
  };

  const downloadFile = () => {
    for (let i = 0; i < receivedFile.length; i++) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(receivedFile[i]);
      link.download = `${receivedName[i]}`;
      link.type = "application/octet-stream";
      link.click();
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <img
        src={circle1}
        alt=""
        className="absolute top-[60%] left-[70%] md:top-[56%] h-[5rem] md:h-[10rem]  md:left-[54%] blur-lg opacity-60"
      />
      <img
        src={circ}
        className="sm:h-[20rem] opacity-60 h-[10rem]  absolute top-[25%] sm:top-[10%] right-[58%] sm:right-[53%] blur-lg"
      />
      <div className="absolute z-10 flex flex-col gap-4 justify-center items-center bg-gradient-to-br px-10 py-10 from-[rgba(255,255,255,0.2)] to-[rgba(0,0,0,0.03)]  rounded-2xl backdrop-blur-xl ">
        {receiverId ? (
          <QRCode
            title="IDQR"
            value={receiverId}
            bgColor={"#FFFFFF"}
            fgColor={"#000000"}
            size={156}
          />
        ) : (
          <Spinner color={"black"} thickness={5} size={20} />
        )}
        <p className="font-sans mt-2 text-xs">{receiverId}</p>
        {receiving && <div>Receiving....{progress}%</div>}
        {receivedFile.length > 0 && (
          <div className="font-sans mt-2">Files Received :</div>
        )}
        {receivedName.length > 0 &&
          receivedName.map((e) => {
            return <div className="text-center">{e}</div>;
          })}
        {receivedFile.length > 0 && (
          <button
            className="bg-[#ffffff] w-44 h-12 rounded-xl font-pops text-xl "
            onClick={downloadFile}
          >
            Download Files
          </button>
        )}
      </div>
    </div>
    // <div className="bg-[#eae8f2] h-screen flex flex-col items-center justify-center ">
    //   <div className="flex flex-col items-center justify-center py-10 rounded-xl px-5 bg-[#ffffff]">
    // {receiverId && (
    //   <QRCode
    //     title="GeeksForGeeks"
    //     value={receiverId}
    //     bgColor={"#FFFFFF"}
    //     fgColor={"#000000"}
    //     size={156}
    //   />
    // )}
    // <p className="font-sans mt-2 text-xs">{receiverId}</p>
    // {receiving && <div>Receiving....{progress}%</div>}
    // {receivedFile.length > 0 && (
    //   <div className="font-sans mt-2">Files Received :</div>
    // )}
    // {receivedName.length > 0 &&
    //   receivedName.map((e) => {
    //     return <div>{e}</div>;
    //   })}

    // {receivedFile.length > 0 && (
    //   <button
    //     className="bg-[#f4f4f4] w-52  shadow-md rounded-xl hover:bg-[#fc6b68] mt-5  hover:text-[#ffffff] hover:shadow-xl text-2xl py-2"
    //     onClick={downloadFile}
    //   >
    //     Download Files
    //   </button>
    // )}
    //   </div>
    // </div>
  );
};

export default Receive;
