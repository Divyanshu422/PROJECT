import React, { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const useGif = (data) => {
  const [spinner, setSpinner] = useState(true);
  const [gif, setGif] = useState("");
  const Url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

  const clickHandler = async (data) => {
    setSpinner(true);
    const response = await axios.get(data ? `${Url}&tag=${data}` : Url);
    setGif(response?.data?.data?.images?.downsized_large?.url);
    setSpinner(false);
  };
  useEffect(() => {
    clickHandler();
  }, []);

  return { gif, spinner, clickHandler };
};

export default useGif;
