import { RecoilRoot } from "recoil";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inside from "./pages/Inside";

function App() {
  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inside" element={<Inside />} />
            <Route path="/a" element={<Home />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </>
  );
}

export default App;
