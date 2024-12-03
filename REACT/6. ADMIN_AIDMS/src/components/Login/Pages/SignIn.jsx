import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../CommonComponent/Header";
import Cdac_Logo from "../../Assets/Cdac_Logo.png";
import Footer from "../CommonComponent/Footer";
import { validateForm } from "../validate/validateSignIn";
import Captcha from "./Captcha";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "Admin",
    password: "Admin@123",
    captcha: "",
    enterCaptcha: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCaptchaChange = (newCaptcha) => {
    setFormData((prev) => ({ ...prev, captcha: newCaptcha }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateForm(
      formData.username,
      formData.password,
      formData.enterCaptcha,
      formData.captcha
    );
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setError("");
    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://10.224.1.182:3026/AUTH-SERVICE/users/authenticate",
        {
          userName: formData.username,
          password: formData.password,
        }
      );
      toast.success(response.data.message);
      // setTimeout(() => {
      //   navigate("/signotp", { state: { username: formData.username } });
      // }, 2500);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("Server Side Problem");
      } else {
        toast.error("Authentication failed. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center space-y-6 sm:space-y-8 px-4 sm:px-8">
        <img
          src={Cdac_Logo}
          alt="CDAC Logo"
          className="w-24 h-24 sm:w-36 sm:h-36 object-contain"
        />
        <form
          className="border border-gray-300 p-4 sm:p-6 rounded-md shadow-md flex flex-col space-y-4 w-full max-w-sm sm:max-w-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-base sm:text-lg font-semibold">
            Sign In
          </h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 sm:px-4 sm:py-3 rounded-md w-full"
            aria-label="Username"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 sm:px-4 sm:py-3 rounded-md w-full"
            aria-label="Password"
          />
          <Captcha onCaptchaChange={handleCaptchaChange} />
          <input
            type="text"
            name="enterCaptcha"
            placeholder="Enter Captcha"
            value={formData.enterCaptcha}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 sm:px-4 sm:py-3 rounded-md w-full"
            aria-label="Enter Captcha"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className={`bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-md w-full hover:bg-blue-600 transition duration-200 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
          <div className="flex justify-between text-xs sm:text-sm mt-2">
            <Link to="/forgot" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
            <Link
              to="/registrationpage"
              className="text-blue-500 hover:underline"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default SignIn;
