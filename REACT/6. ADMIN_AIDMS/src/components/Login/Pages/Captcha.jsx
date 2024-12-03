import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaSync } from "react-icons/fa";
const Captcha = ({ onCaptchaChange }) => {
  const [captcha, setCaptcha] = useState("");
  const canvasRef = useRef(null);

  const generateCaptcha = useCallback(() => {
    const characters = "0123456789!@#$%^&*";
    let captchaText = "";
    for (let i = 0; i < 6; i++) {
      captchaText += characters[Math.floor(Math.random() * characters.length)];
    }
    setCaptcha(captchaText);
    onCaptchaChange(captchaText);
  }, [onCaptchaChange]);

  const drawCaptcha = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set responsive canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add background noise (dots)
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 0.7)`;
      ctx.fill();
    }

    // Draw random lines
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 0.7)`;
      ctx.lineWidth = Math.random() * 2;
      ctx.stroke();
    }

    // Set font style and add sketch-like effect
    const fontSize = Math.min(canvas.width / 5, 30);
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.lineWidth = 1.5;

    const spacing = canvas.width / (captcha.length + 1);
    let x = spacing / 2;
    captcha.split("").forEach((char) => {
      const angle = (Math.random() - 0.5) * 0.4;
      ctx.save();
      ctx.translate(x, canvas.height / 1.5);
      ctx.rotate(angle);

      ctx.strokeStyle = "black";
      ctx.strokeText(char, 0, 0);

      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 0.8)`;
      ctx.fillText(char, 0, 0);

      ctx.restore();
      x += spacing;
    });

    ctx.beginPath();
    ctx.moveTo(0, Math.random() * canvas.height);
    ctx.bezierCurveTo(
      canvas.width / 3,
      Math.random() * canvas.height,
      (canvas.width * 2) / 3,
      Math.random() * canvas.height,
      canvas.width,
      Math.random() * canvas.height
    );
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [captcha]);

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (captcha) {
      drawCaptcha();
    }
  }, [captcha, drawCaptcha]);

  return (
    <div className="captcha-container w-full flex flex-col md:flex-row gap-4 items-center">
      <canvas
        ref={canvasRef}
        width={200}
        height={60}
        className="border w-full h-10 border-gray-300 bg-gray-50 rounded-lg shadow-lg p-2 transition hover:shadow-xl"
      />
      <button
        type="button"
        onClick={generateCaptcha}
        className="w-full md:w-auto px-2 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200 flex items-center justify-center"
        aria-label="Refresh Captcha"
      >
        <FaSync className="mr-2 text-xl" />
      </button>
    </div>
  );
};

export default Captcha;
