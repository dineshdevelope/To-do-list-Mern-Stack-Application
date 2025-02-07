import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState("");

  /*  useEffect(() => {
    console.log(localStorage.getItem("token"));
    
  }, [token]); */

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/dashboard"
            element={
              token ? (
                <Dashboard token={token} setToken={setToken} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
