import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
// import  from "./Pages/PopUp";
import Listnft from "./Pages/Listnft";
import Nav from "./components/Nav";
import { MyProvider } from "./utils/context";
import { Floatingmenu } from "./components/Floatingmenu";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyProvider>
          <Nav />
          <Listnft />
          <Floatingmenu />
        </MyProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
