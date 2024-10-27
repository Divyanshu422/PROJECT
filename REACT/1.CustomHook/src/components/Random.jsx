import React, { useState, useEffect } from "react";
import axios from "axios";

const Random = () => {
  const [gif, setGif] = useState("");
  const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
  const clickHandler = async () => {
    const response = await axios.get(url);
    setGif(response?.data?.data?.images?.downsized_large?.url);
  };

  useEffect(() => {
    clickHandler();
  }, []);
  return (
    <div className="flex flex-col px-4 rounded-lg border-1 border-black w-6/12 bg-green-500 mt-4 gap-2 items-center">
      <h1 className="py-4 text-2xl font-bold underline">A Random GIF</h1>
      <img src={gif} className="w-[450px]" />
      <button
        className="w-10/12 mb-2 py-2 text-sm font-semibold rounded-md uppercase bg-green-200"
        onClick={clickHandler}
      >
        generate
      </button>
    </div>
  );
};

export default Random;
