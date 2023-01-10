// versi "react-qr-reader" 1.0.0. component API harus disesuaikan dengan yg baru

// import "./styles.css";
// import { useState } from "react";
// import QrReader from "react-qr-reader";

// const App = () => {
//   const [selected, setSelected] = useState("environment");
//   const [startScan, setStartScan] = useState(false);
//   const [loadingScan, setLoadingScan] = useState(false);
//   const [data, setData] = useState("");

//   const handleScan = async (scanData) => {
//     setLoadingScan(true);
//     console.log(`loaded data data`, scanData);
//     if (scanData && scanData !== "") {
//       console.log(`loaded >>>`, scanData);
//       setData(scanData);
//       setStartScan(false);
//       setLoadingScan(false);
//       // setPrecScan(scanData);
//     }
//   };
//   const handleError = (err) => {
//     console.error(err);
//   };
//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>
//         Last Scan:
//         {selected}
//       </h2>

//       <button
//         onClick={() => {
//           setStartScan(!startScan);
//         }}
//       >
//         {startScan ? "Stop Scan" : "Start Scan"}
//       </button>
//       {startScan && (
//         <>
//           <select onChange={(e) => setSelected(e.target.value)}>
//             <option value={"environment"}>Back Camera</option>
//             <option value={"user"}>Front Camera</option>
//           </select>
//           <QrReader
//             facingMode={selected}
//             delay={1000}
//             onError={handleError}
//             onScan={handleScan}
//             // chooseDeviceId={()=>selected}
//             style={{ width: "300px" }}
//           />
//         </>
//       )}
//       {loadingScan && <p>Loading</p>}
//       {data !== "" && <p>{data}</p>}
//     </div>
//   );
// };

// export default App;

import React from 'react'
import UserState from './context/userState';
import Navbar from './Components/Navbar';
import ScanQR from './Components/Scanqr';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { Issue } from './Components/Issue';
import {Viewnft} from "./Components/Viewnft";
import { Updatenft } from './Components/Updatenft';
// import TransferOwner from './Components/transferOwner';
const App = () => {
  return (
  <>
  <UserState>
  <HashRouter>
    <header>
      <Navbar />
    </header>
    <main>
    <Routes>
        {/* <Route path="/" element={<NFTCard />}/> */}
        <Route path="/issue" element={<Issue />}/>
        <Route path="/viewnft" element={<Viewnft />}/>
        <Route path="/updatenft" element={<Updatenft />}/>
        {/* <Route path="/src/Components/transferOwner.js" element={<TransferOwner />}/> */}
      </Routes>
    </main>
    </HashRouter>
  </UserState>

  </>
  )
}

export default App;

