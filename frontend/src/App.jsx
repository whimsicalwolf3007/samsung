import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./layouts/UserProfile";
import RequestUpdate from "./layouts/Requestupdates";
import Ray from "./layouts/Ray";
import WorkletsPage from "./components/WorkletsPage";
import WorkletDetailPage from './components/WorkletDetailsPage';
import Login from "./components/login";
import StatisticsDashboard from "./layouts/Statistics";

// The single source of truth for user data
const initialUserData = {
  avatarUrl: null,
  name: 'Mary Christian',
  handle: '@mary_prism',
  bio: 'PRISM / Tech Strategy, Software Developer. Turning ideas into impact.',
  qualification: 'Software Developer',
  dob: '1992-11-24',
  location: 'Bengaluru, India',
  website: 'https://mary.dev',
};

export default function App() {
  // The user data state is managed here
  const [userData, setUserData] = useState(initialUserData);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Pass userData down to the Dashboard */}
        <Route path="/home" element={<Dashboard userData={userData} />} />

        {/* CORRECTED ROUTE: The path is now a clean URL, not a file path. */}
        <Route path="/statistics" element={<StatisticsDashboard />} />
        
        {/* Pass both userData and the function to update it to the UserProfile */}
        <Route path="/profile" element={<UserProfile userData={userData} onProfileUpdate={setUserData} />} />

        {/* Other Routes */}
        <Route path="/request-update" element={<RequestUpdate />} />
        <Route path="/ray" element={<Ray />} />
        <Route path="/worklets" element={<WorkletsPage />} />
        <Route path="/worklet/:id" element={<WorkletDetailPage />} />
        
        {/* Pass userData to other instances of Dashboard if they exist */}
        <Route path="/share-suggestion" element={<Dashboard userData={userData} />} />
        <Route path="/internship-referral" element={<Dashboard userData={userData} />} />
        <Route path="/submit-feedback" element={<Dashboard userData={userData} />} />
      </Routes>
    </ThemeProvider>
  );
}