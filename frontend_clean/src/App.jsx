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

function App() {
  return (
    <Router>
      <StreakProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboard with Nested Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="aptitude" element={<AptitudeDashboard />} />
            <Route path="aptitude/:category" element={<AptitudeTest />} />

            {/* Roadmaps */}
            <Route path="roadmaps" element={<RoadmapDashboard />} />
            <Route path="roadmap/:slug" element={<RoadmapView />} />
          </Route>

          <Route
            path="/programming-languages"
            element={<ProgrammingLanguages />}
          />
          <Route
            path="/problem/:id"
            element={<ProblemWorkspace />}
          />

          {/* Legacy Roadmap Routes Removed */}
        </Routes>
      </StreakProvider>
    </Router>
  );
}

export default App;
