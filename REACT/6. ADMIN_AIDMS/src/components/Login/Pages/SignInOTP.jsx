import React, { useState, memo } from "react";
import Header from "../CommonComponent/Header";
import Footer from "../CommonComponent/Footer";
import Cdac_Logo from "../../Assets/Cdac_Logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { storeToken } from "../../../utils/TokenStorage";
import { useAuth } from "../../../contextAPI/AuthContext";

const SignInOTP = () => {
  const location = useLocation();
  const { username } = location.state || {};
  const [emailOtp, setEmailOtp] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // OTP validation function
  const validateOtp = (otp) => {
    return /^\d{6}$/.test(otp); // Ensures OTP is a 6-digit number
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate OTP
    if (!validateOtp(emailOtp)) {
      setError("Email OTP must be a 6-digit number.");
      return;
    }

    // Clear any previous error
    setError("");

    try {
      const response = await axios.post(
        "http://10.224.1.182:3026/AUTH-SERVICE/users/verify",
        {
          userName: username,
          otp: emailOtp,
        }
      );

      // Handle successful response
      storeToken(response.data.jwt, response.data.refreshToken);
      login();
      if (response?.data?.roles[0] === "Admin") {
        navigate("/admin/dashboard");
      } else {
        //   navigate("/dashboard");
      }
    } catch (error) {
      // Handle API errors
      console.error("Error during OTP verification:", error);
      setError("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <img
          src={Cdac_Logo}
          alt="CDAC Logo"
          className="w-36 h-36 my-4 object-contain"
        />
        <div className="border p-8 rounded-md shadow-md max-w-xs w-full">
          <h2 className="text-center text-xl font-semibold mb-6">
            OTP Verification
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Wrap the component with React.memo to optimize unnecessary re-renders
export default memo(SignInOTP);
