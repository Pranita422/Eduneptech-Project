import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StreakProvider } from "./context/StreakContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProgrammingLanguages from "./pages/ProgrammingLanguages";
//import LanguagePage from "./pages/LanguagePage";

function App() {
  return (
    <Router>
      <StreakProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/programming-languages"
            element={<ProgrammingLanguages />}
          />
        </Routes>
      </StreakProvider>
    </Router>
  );
}

export default App;
