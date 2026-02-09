import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StreakProvider } from "./context/StreakContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProgrammingLanguages from "./pages/ProgrammingLanguages";
import ProblemWorkspace from "./pages/ProblemWorkspace";
import RoadmapAptitude from "./pages/RoadmapAptitude";
import RoadmapDashboard from "./pages/RoadmapDashboard";
import RoadmapView from "./pages/RoadmapView";
import AptitudeDashboard from "./pages/AptitudeDashboard";
import AptitudeTest from "./pages/AptitudeTest";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <Router>
      <StreakProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="aptitude" element={<AptitudeDashboard />} />
            <Route path="aptitude/:category" element={<AptitudeTest />} />
            <Route path="roadmaps" element={<RoadmapDashboard />} />
            <Route path="roadmap/:slug" element={<RoadmapView />} />
          </Route>

          <Route
            path="/programming-languages"
            element={
              <ProtectedRoute>
                <ProgrammingLanguages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problem/:id"
            element={
              <ProtectedRoute>
                <ProblemWorkspace />
              </ProtectedRoute>
            }
          />
        </Routes>
      </StreakProvider>
    </Router>
  );
}

export default App;
