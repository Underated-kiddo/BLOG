import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom"
import  LogIn  from "@/pages/Login";
import  Signup from "@/pages/signup";
import Dashboard from "./pages/Dashboard";
import SinglePost from "./pages/SinglePost";
import ProtectedRoute  from "@/utils/ProtectedRoute";
import { Toaster} from "sonner";

import Navbar from "@/components/Navbar";

export default function App () {
  const location = window.location.pathname;
  const hideNavbar = location === "/login" || location === "/signup";
  return(
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <SinglePost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}