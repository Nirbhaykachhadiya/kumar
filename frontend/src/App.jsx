import { RecoilRoot } from "recoil";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inside from "./pages/Inside";
import Pdf from "./pages/Pdf";

function App() {
  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inside" element={<Inside />} />
            <Route path="/pdf" element={<Pdf />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </>
  );
}

export default App;
