import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import prismLogo from "../assets/logo.jpeg";
export default function Login() {
  const [page, setPage] = useState("login"); // 'login', 'signup', 'home'
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // New state for name
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("student"); // default role
  const simulatedOtp = "123456";
const navigate = useNavigate(); 
  // Function to show a temporary message
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  // Login handler
   const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please fill all fields.");
      return;
    }
    setMessage(`Login successful as ${role}!`);
alert(`Login successful as ${role}!`);
navigate("/home");
};
  // Signup handlers
  const sendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      showMessage("Please enter your email.");
      return;
    }
    setOtpSent(true);
    setOtpVerified(false);
    setOtpInput("");
    showMessage(`OTP sent to ${email} (simulated: ${simulatedOtp})`);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (otpInput === simulatedOtp) {
      setOtpVerified(true);
      showMessage("OTP verified successfully! You can now log in.");
      setPage("login"); // Switch back to login after OTP is verified
    } else {
      showMessage("Invalid OTP. Please try again.");
    }
  };

  const renderContent = () => {
    switch (page) {
      case "login":
        return (
          <div className="flex min-h-screen bg-gray-100 items-center justify-center p-4"
          style={{
            backgroundImage: "linear-gradient(to right, #e0e7ff, #f3e8ff, #bae6fd)",
          }}
        >
          <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-3xl">
            {/* Left Form */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  Login
                </h2>
                <form className="space-y-4" onSubmit={handleLoginSubmit}>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email:
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password:
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role:
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="student">Student</option>
                      <option value="mentor">Mentor</option>
                      <option value="RND">RND</option>
                    </select>
                  </div>
                  {/* Submit for Login */}
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  >
                    Login
                  </button>
                </form>
                {/* Toggle to Signup */}
                <p className="mt-4 text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      setPage("signup");
                      setOtpSent(false);
                      setOtpInput("");
                      setOtpVerified(false);
                      setMessage("");
                    }}
                    className="text-indigo-600 hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
              {/* Right Side Image */}
              <div className="hidden md:block md:w-1/2">
                <img
                  src={prismLogo}
                  alt="Prism Logo"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        );

      case "signup":
        return (
          <div className="flex min-h-screen bg-gray-100 items-center justify-center p-4"
          style={{
            backgroundImage: "linear-gradient(to right, #e0e7ff, #f3e8ff, #bae6fd)",
          }}
        >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-3xl">
              {/* Left Form */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  Sign Up
                </h2>
                <form
                  className="space-y-4"
                  onSubmit={otpSent ? verifyOtp : sendOtp}
                >
                  {/* Name and Role Side by Side */} 
                 <div className="flex space-x-4">
                   {/* Name */}
                 <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                     Name:
                     </label> 
                   <input
                   type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                   required
                   />
               </div>
  {/* Role */}
  <div className="flex-1">
    <label className="block text-sm font-medium text-gray-700">
      Role:
    </label>
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      required
    >
      <option value="student">Student</option>
      <option value="mentor">Mentor</option>
      <option value="RND">RND</option>
    </select>
  </div>
</div>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email:
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  {/* OTP Handling */}
                  {!otpSent && (
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    >
                      Send OTP
                    </button>
                  )}
                  {otpSent && !otpVerified && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Enter OTP:
                        </label>
                        <input
                          type="text"
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value)}
                          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      >
                        Verify OTP
                      </button>
                    </>
                  )}
                </form>
                {/* Toggle to Login */}
                <p className="mt-4 text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setPage("login");
                      setOtpSent(false);
                      setOtpInput("");
                      setOtpVerified(false);
                      setMessage("");
                    }}
                    className="text-indigo-600 hover:underline"
                  >
                    Login
                  </button>
                </p>
              </div>
              {/* Right Side Image */}
              <div className="hidden md:block md:w-1/2">
                <img
                  src={prismLogo}
                  alt="Prism Logo"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Global Message Box */}
      {message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-lg shadow-xl z-50 animate-slide-in-down">
          <p className="text-sm font-medium text-center text-gray-800">
            {message}
          </p>
        </div>
      )}
      {renderContent()}
    </div>
  );
}