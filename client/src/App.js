// import "./App.css";
import { BrowserRouter, Routes, Link, Route, Navigate } from "react-router-dom";
//import Templates from "./Templates";
import SignUp from "./sign-up/SignUp";
import SignIn from "./sign-in/SignIn";
import Dashboard from "./dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
