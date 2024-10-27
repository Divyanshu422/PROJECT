import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import useGif from "./customHook/useGif";
const Random = () => {
  const { gif, spinner, clickHandler } = useGif();

  return (
    <div className="flex flex-col px-4 rounded-lg border-1 border-black w-6/12 bg-green-500 mt-4 gap-2 items-center">
      <h1 className="py-4 text-2xl font-bold underline">A Random GIF</h1>
      {spinner ? <Spinner /> : <img src={gif} className="w-[450px]" />}
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
