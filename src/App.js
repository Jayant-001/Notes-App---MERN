import { Route, Routes } from "react-router-dom";
import { About } from "./components/About";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Pricing } from "./components/Pricing";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/pricing" element={<Pricing />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
