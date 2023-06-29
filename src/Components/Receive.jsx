import React, { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import Peer from "peerjs";
import receiver from "./../assets/receiver.png";

const Receive = () => {
  const [receiverId, setReceiverID] = useState(null);
  const [receivedFile, setReceivedFile] = useState([]);
  const [chunk, setChunk] = useState([]);
  const [combined, setCombined] = useState(null);

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
        chunk = [...chunk, data.file];
        setProgress(data.progress);
        if (data.progress == 100) {
          console.log(data);
          combineTheChunks(chunk);
          chunk = [];
          setProgress(0);
          setReceivedName((prevname) => [...prevname, data.name]);
        }

        // setProgress(data.progress);
        // setReceivedName(data.name);

        // const uint8Array = new Uint8Array(data.file);
        // const blob = new Blob([uint8Array]);
        // const file = new File([blob], `received`);
        // setReceivedFile(file);
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
    <div className="bg-share w-screen h-screen flex flex-col items-center justify-center ">
      <div className="h-[94vh] w-[88vw]   xl:h-[90vh] xl:w-[95vw] sm:h-[90vh] sm:w-[93vw] border-2 rounded-xl ">
        <div className="w-[100%] flex items-center justify-center">
          <img src={receiver} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center mt-36 sm:mt-28 lg:mt-10 xl:mt-0">
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
          <div>Receiving....{progress}%</div>
          <div className="font-sans mt-2">Files Received :</div>
          {receivedName.length > 0 &&
            receivedName.map((e) => {
              return <div>{e}</div>;
            })}

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
