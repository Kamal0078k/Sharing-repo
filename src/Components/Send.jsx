import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
// import QrReader from "react-qr-reader";
import { QrReader } from "react-qr-reader";

const Send = () => {
  const [receiverId, setReceiverId] = useState("");
  const peerRef = useRef(null);
  const [scan, setScan] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    var peer = new Peer();
    peer.on("open", function (id) {
      console.log(id);
    });
    peerRef.current = peer;
  });

  const sendFiles = () => {
    var conn = peerRef.current.connect(`${receiverId}`);
    if (files != null) {
      conn.on("open", () => {
        for (let j = 0; j < files.length; j++) {
          const chunkSize = 1024 * 1024; // In bytes
          const chunks = Math.ceil(files[j].size / chunkSize);
          console.log(files[j].size);
          var pro = 0;
          for (let i = 0; i < chunks; i++) {
            const offset = i * chunkSize;
            pro = ((i + 1) / chunks) * 100;
            setProgress(pro);
            conn.send({
              file: files[j].slice(offset, offset + chunkSize),
              name: files[j].name,
              size: files[j].size,
              type: "file",
              progress: ((i + 1) / chunks) * 100,
            });
          }
        }
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
          multiple
          onChange={(e) => {
            setFiles(e.target.files);
          }}
        />
        <button
          className="text-[#ffffff]  rounded-lg w-40 h-10 mt-5 bg-[#000000] border-2  hover:text-[#000000]  hover:bg-share"
          onClick={sendFiles}
        >
          Send
        </button>
        {progress == 100 && <div>Sent Succesfully</div>}
      </div>
    </div>
  );
};

export default Send;
