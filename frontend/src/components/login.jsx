import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Using a placeholder for the logo import, as the actual asset isn't available.
const prismLogo = "https://placehold.co/600x800/6366f1/ffffff?text=PRISM&font=raleway";

export default function Login() {
  const [page, setPage] = useState("login"); // 'login', 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("student"); // default role
  
  const simulatedOtp = "123456";
  const navigate = useNavigate();

  // Function to show a temporary message
  const showMessage = (msg, duration = 3000) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), duration); // Clear message after duration
  };

  // Login handler
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showMessage("Please fill in all fields.");
      return;
    }
    // Simulate successful login
    showMessage(`Login successful as ${role}!`);
    // Navigate to the home page after a short delay
    setTimeout(() => navigate("/home"), 1500);
  };

  // Signup Step 1: Send OTP
  const sendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      showMessage("Please enter your email to sign up.");
      return;
    }
    setOtpSent(true);
    showMessage(`A verification OTP has been sent to ${email} (Simulated: ${simulatedOtp})`);
  };

  // Signup Step 2: Verify OTP
  const verifyOtp = (e) => {
    e.preventDefault();
    if (!otpInput) {
        showMessage("Please enter the OTP.");
        return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      if (otpInput === simulatedOtp) {
        setOtpVerified(true);
        showMessage("OTP verified successfully! Please set your password.");
      } else {
        showMessage("Invalid OTP. Please try again.");
      }
      setIsVerifying(false);
    }, 1500); // Simulate network delay
  };
  
  // Signup Step 3: Final account creation
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      showMessage("Please fill out both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showMessage("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
        showMessage("Password must be at least 6 characters long.");
        return;
    }

    // On successful signup, log the user in directly
    showMessage("Account created successfully! Logging you in...");
    // Navigate to the home page after a short delay
    setTimeout(() => {
        navigate("/home");
    }, 2000);
  }

  const RoleSelector = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select your role:
      </label>
      <div className="flex items-center space-x-4">
        {["student", "mentor", "admin"].map((r) => (
          <label key={r} className="flex items-center text-sm text-gray-600 cursor-pointer">
            <input
              type="radio"
              name="role"
              value={r}
              checked={role === r}
              onChange={(e) => setRole(e.target.value)}
              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span className="ml-2 capitalize">{r}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    const commonContainerClasses = "flex min-h-screen bg-gray-100 items-center justify-center p-4";
    const commonGradient = { backgroundImage: "linear-gradient(to right, #e0e7ff, #f3e8ff, #bae6fd)" };

    switch (page) {
      case "login":
        return (
          <div className={commonContainerClasses} style={commonGradient}>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-3xl">
              {/* Left Form */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>
                <form className="space-y-4" onSubmit={handleLoginSubmit}>
                  <RoleSelector />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" required />
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                    Login
                  </button>
                </form>
                <p className="mt-4 text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button onClick={() => setPage("signup")} className="text-indigo-600 hover:underline font-medium">
                    Sign Up
                  </button>
                </p>
              </div>
              {/* Right Side Image */}
              <div className="hidden md:block md:w-1/2">
                <img src={prismLogo} alt="Prism Logo" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        );

      case "signup":
        return (
          <div className={commonContainerClasses} style={commonGradient}>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-3xl">
              {/* Left Form */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Sign Up</h2>
                <form className="space-y-4" onSubmit={otpVerified ? handleSignupSubmit : (otpSent ? verifyOtp : sendOtp)}>
                  <RoleSelector />
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100" disabled={otpSent} required />
                  </div>

                  {/* Step 1: Send OTP Button */}
                  {!otpSent && (
                    <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                      Send OTP
                    </button>
                  )}
                  
                  {/* Step 2: Verify OTP Section */}
                  {otpSent && !otpVerified && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Enter OTP:</label>
                        <input type="text" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" required />
                      </div>
                      <button type="submit" disabled={isVerifying} className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all disabled:bg-green-400 disabled:cursor-not-allowed">
                        {isVerifying ? "Verifying..." : "Verify OTP"}
                      </button>
                    </>
                  )}

                  {/* Step 3: Set Password Section */}
                  {otpVerified && (
                     <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Password:</label>
                          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" required />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                           Create Account
                        </button>
                     </>
                  )}
                </form>
                 <p className="mt-4 text-sm text-gray-600">
                  Already have an account?{" "}
                  <button onClick={() => setPage("login")} className="text-indigo-600 hover:underline font-medium">
                    Login
                  </button>
                </p>
              </div>
               {/* Right Side Image */}
               <div className="hidden md:block md:w-1/2">
                <img src={prismLogo} alt="Prism Logo" className="h-full w-full object-cover" />
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
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-lg shadow-2xl z-50 border-t-4 border-indigo-500 animate-slide-in-down">
          <p className="text-sm font-medium text-center text-gray-800">{message}</p>
        </div>
      )}
      {renderContent()}
    </div>
  );
}