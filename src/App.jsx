import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext"; // ++ Import the ThemeProvider
import Dashboard from "./pages/Dashboard";
import RequestUpdate from "./layouts/Requestupdates";
import Ray from "./layouts/Ray";

export default function App() {
  return (
    // ++ Wrap your entire application with the ThemeProvider
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/request-update" element={<RequestUpdate />} />
        <Route path="/ray" element={<Ray />} />
        <Route path="/share-suggestion" element={<Dashboard />} />
        <Route path="/internship-referral" element={<Dashboard />} />
        <Route path="/submit-feedback" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
}