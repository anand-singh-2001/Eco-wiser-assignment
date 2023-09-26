import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import "./App.css";
import Notes from "./pages/Notes";

const App = () => {
  return (
    <div style={{ backgroundColor: "#5bbbf175", height: "100vh" }}>
      <Routes>
        <Route path="/" element={<Notes />} />
      </Routes>
    </div>
  );
};

export default App;
