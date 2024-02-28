import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./stylesheets/alignments.css";
import "./stylesheets/sizes.css";
 
import "./stylesheets/form-elements.css";
import "./stylesheets/theme.css";
import './stylesheets/custom.css'


function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
