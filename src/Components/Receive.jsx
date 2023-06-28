import React, { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import Peer from "peerjs";
import receiver from "./../assets/receiver.png";

const Receive = () => {
  const [receiverId, setReceiverID] = useState(null);
  const [receivedFile, setReceivedFile] = useState(null);
  const [ext, setExt] = useState(null);
  const [receivedName, setReceivedName] = useState(null);
  useEffect(() => {
    var peer = new Peer();

    peer.on("open", function (id) {
      setReceiverID(id);
      console.log(id);
    });

    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        console.log("Received data", data);
        const extension = data[1].split(".").pop().toLowerCase();
        setExt(extension);
        setReceivedName(data[1]);
        console.log(extension);
        const uint8Array = new Uint8Array(data[0]);
        const blob = new Blob([uint8Array]);
        const file = new File([blob], `received`);
        setReceivedFile(file);
      });
    });
  }, []);

  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(receivedFile);
    link.download = `${receivedName}`;
    link.type = "application/octet-stream";
    link.click();
  };

  return (
    <div className="bg-share w-screen h-screen flex flex-col items-center justify-center ">
      <div className="h-[94vh] w-[88vw]   xl:h-[90vh] xl:w-[95vw] sm:h-[90vh] sm:w-[93vw] border-2 rounded-xl ">
        <div className="w-[100%] flex items-center justify-center">
          <img src={receiver} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center mt-40 sm:mt-28 lg:mt-10 xl:mt-0">
          {receiverId && (
            <QRCode
              title="GeeksForGeeks"
              value={receiverId}
              bgColor={"#FFFFFF"}
              fgColor={"#000000"}
              size={156}
            />
          )}
          <p className="font-sans mt-2">{receiverId}</p>
          <div className="font-sans mt-2">Files Received :</div>
          {receivedName && (
            <div className="text-center border-2 px-2 rounded-md">
              {" "}
              {receivedName}
            </div>
          )}
          <button
            className="text-[#ffffff] w-40 h-10 mt-5 bg-[#000000] border-2  hover:text-[#000000] hover:bg-share"
            onClick={downloadFile}
          >
            Download Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receive;
