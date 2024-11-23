import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
// import  from "./Pages/PopUp";
import Listnft from "./Pages/Listnft";
import Nav from "./components/Nav";
import { MyProvider } from "./utils/context";
import { Floatingmenu } from "./components/Floatingmenu";
import Viewnft from "./Pages/viewNFT";
import NFT from "./components/NFT";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyProvider>
          <Nav />
          <Routes>
            {/* <Route path="/list" element={<Home />} /> */}
            <Route path="/list" element={<Listnft />} />
            <Route path="/view" element={<Viewnft />} />
            <Route path="/view/:id" element={<NFT />} />
          </Routes>
          <Floatingmenu />
        </MyProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
