import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
// import QrReader from "react-qr-reader";
import { QrReader } from "react-qr-reader";

const Send = () => {
  const [receiverId, setReceiverId] = useState(null);
  const peerRef = useRef(null);
  const [scan, setScan] = useState(false);
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
    <div className="bg-share h-screen w-screen flex items-center justify-center">
      <div className="h-[94vh] w-[88vw]  xl:h-[90vh] xl:w-[95vw] sm:h-[90vh] sm:w-[93vw] border-2 rounded-xl flex items-center justify-center flex-col ">
        <div>Press Scan to Scan receiver qr-code</div>
        <button
          className="text-[#ffffff]  rounded-lg w-40 h-10 mt-2 bg-[#000000] border-2  hover:text-[#000000]  hover:bg-share"
          onClick={() => {
            setScan(!scan);
          }}
        >
          Scan
        </button>
        {scan && (
          <div className="h-80 w-80">
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  setReceiverId(result?.text);
                  setScan(false);
                }

                if (!!error) {
                  console.log(error);
                }
              }}
              constraints={{
                facingMode: "environment",
              }}
              style={{ width: "100%" }}
              scanDelay={300}
            />
          </div>
        )}

        <label>ReceiverID:</label>
        <input
          className="bg-share border-2 border-[#b5b5b5] rounded-lg w-72"
          type="text"
          value={receiverId}
          onChange={(e) => {
            setReceiverId(e.target.value);
          }}
        />
        <input
          className="mt-5 border-2 rounded-lg  border-[#b5b5b5]"
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <button
          className="text-[#ffffff]  rounded-lg w-40 h-10 mt-5 bg-[#000000] border-2  hover:text-[#000000]  hover:bg-share"
          onClick={sendFiles}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Send;
