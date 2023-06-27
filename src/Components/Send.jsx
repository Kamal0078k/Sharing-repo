import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
// import QrReader from "react-qr-reader";
import { QrReader } from "react-qr-reader";

const Send = () => {
  const [receiverId, setReceiverId] = useState(null);
  const peerRef = useRef(null);
  const qrRef = useRef(null);
  const [file, setFile] = useState(null);
  const [qrcodevalue, setQrcodevlaue] = useState(null);

  useEffect(() => {
    var peer = new Peer();
    peer.on("open", function (id) {
      console.log(id);
    });
    peerRef.current = peer;
  });

  const sendFiles = () => {
    if (file) {
      var conn = peerRef.current.connect(`${receiverId}`);
      conn.on("open", function () {
        conn.send([file, file.name]);
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button>Scan</button>
      <div className="h-10 w-80">
        <QrReader
          onResult={(result, error) => {
            if (!result) {
              setQrcodevlaue(result?.text);
            }

            if (!error) {
              console.log(error);
            }
          }}
          style={{ width: "100%" }}
          scanDelay={300}
        />
      </div>

      <div className="h-80"></div>
      <div>{qrcodevalue}</div>
      <label>ReceiverID:</label>
      <input
        type="text"
        onChange={(e) => {
          setReceiverId(e.target.value);
        }}
      />
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button onClick={sendFiles}>Send</button>
    </div>
  );
};

export default Send;
