import React, { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const useGif = (data) => {
  //   console.log(data);
  const [spinner, setSpinner] = useState(true);
  const [gif, setGif] = useState("");
  const randomUrl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
  const tagUrl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${data}`;

  const clickHandler = async (data) => {
    setSpinner(true);
    const url = data ? tagUrl : randomUrl;
    console.log(url);
    const response = await axios.get(url);
    setGif(response?.data?.data?.images?.downsized_large?.url);
    setSpinner(false);
  };
  useEffect(() => {
    clickHandler();
  }, []);

  return { gif, spinner, clickHandler };
};

export default useGif;
