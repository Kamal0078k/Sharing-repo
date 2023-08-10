import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
// import QrReader from "react-qr-reader";
import { QrReader } from "react-qr-reader";

const Send = () => {
  const [receiverId, setReceiverId] = useState("");
  const [sent, setSent] = useState(false);
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
  }, []);

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

    setSent(true);
    setTimeout(() => {
      setSent(false);
    }, 2000);
  };

  return (
    <div className="bg-[#eae8f2] h-screen w-screen flex items-center justify-center">
      <div className=" bg-[#ffffff] rounded-xl flex items-center justify-center flex-col py-5 px-5 shadow-lg ">
        {/* <div>Press Scan to Scan receiver qr-code</div> */}
        <button
          className="bg-[#f4f4f4] w-36  shadow-md rounded-xl hover:bg-[#fc6b68]   hover:text-[#ffffff] hover:shadow-xl text-2xl py-2"
          onClick={() => {
            setScan(!scan);
          }}
        >
          Scan Qr
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

        <label className="mt-3">ReceiverID:</label>
        <input
          className="bg-[#f4f4f4] p-1   rounded-lg w-52"
          type="text"
          value={receiverId}
          onChange={(e) => {
            setReceiverId(e.target.value);
          }}
        />
        <input
          className="mt-5  rounded-sm w-56"
          type="file"
          multiple
          onChange={(e) => {
            setFiles(e.target.files);
          }}
        />
        <button
          // className="text-[#ffffff]  rounded-lg w-40 h-10 mt-5 bg-[#000000] border-2  hover:text-[#000000]  hover:bg-share"
          className="bg-[#f4f4f4] shadow-md w-36 rounded-xl hover:bg-[#fc6b68] mt-5  hover:text-[#ffffff] hover:shadow-xl text-2xl py-2"
          onClick={sendFiles}
        >
          Send
        </button>
        {sent && progress == 100 ? <div>Sent Succesfully</div> : <div></div>}
      </div>
    </div>
  );
};

export default Send;
