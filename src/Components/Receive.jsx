import React, { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import Peer from "peerjs";

const Receive = () => {
  const [receiverId, setReceiverID] = useState(null);
  const [receivedFile, setReceivedFile] = useState(null);
  const [ext, setExt] = useState(null);
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
    link.download = `receiver.${ext}`;
    link.type = "application/octet-stream";
    link.click();
  };

  return (
    <div className="text-center w-screen flex flex-col items-center justify-center">
      <p>Reciever</p>
      {receiverId && (
        <QRCode
          title="GeeksForGeeks"
          value={receiverId}
          bgColor={"#FFFFFF"}
          fgColor={"#000000"}
          size={156}
        />
      )}

      <p>{receiverId}</p>
      <button onClick={downloadFile}>Download</button>
    </div>
  );
};

export default Receive;
