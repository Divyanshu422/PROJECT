import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import useGif from "./customHook/useGif";
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const Tag = () => {
  const [data, setData] = useState("car");
  const { gif, spinner, clickHandler } = useGif(data);
  return (
    <div className="flex flex-col px-4 rounded-lg border-1 border-black w-6/12 bg-blue-500 mt-4 gap-2 items-center">
      <h1 className="py-4 text-2xl font-bold underline">Random {data} GIF</h1>
      {spinner ? <Spinner /> : <img src={gif} className="w-[450px]" />}
      <input
        type="text"
        placeholder="Enter the name"
        value={data}
        className="w-10/12 text-center mb-2 px-4 py-2 text-sm font-semibold rounded-md uppercase"
        onChange={(e) => setData(e.target.value)}
      />
      <button
        className="w-10/12 mb-2 py-2 text-sm font-semibold rounded-md uppercase bg-green-200"
        onClick={() => clickHandler(data)}
      >
        Generate
      </button>
    </div>
  );
};

export default Tag;
