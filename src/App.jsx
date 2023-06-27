import react, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Option from "./Components/Option";
import Send from "./Components/Send";
import Receive from "./Components/Receive";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Option />} />
      <Route path="/send" element={<Send />} />
      <Route path="/receive" element={<Receive />} />
    </Routes>
  );
}

export default App;
