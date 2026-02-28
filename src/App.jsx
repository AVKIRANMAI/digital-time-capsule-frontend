import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateCapsule from "./pages/CreateCapsule";
import SharedCapsule from "./pages/SharedCapsule";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewCapsule from "./pages/ViewCapsule";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shared/:token" element={<SharedCapsule />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/capsule/:id"
  element={
    <ProtectedRoute>
      <ViewCapsule />
    </ProtectedRoute>
  }
/>

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateCapsule />
            </ProtectedRoute>
          }
        />
      </Routes>
    
  );
}

export default App;