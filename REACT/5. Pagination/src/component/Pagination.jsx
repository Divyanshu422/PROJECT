import React, { useEffect, useState } from "react";
import axios from "axios";
const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage; // Last post index
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // First post index
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost); // Current posts
  const totalPages = Math.ceil(data.length / postsPerPage); // Total number of pages
  console.log(totalPages);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://dummyjson.com/users?limit=0");
      setData(response?.data?.users);
    };
    fetchData();
  }, []);

  return (
    <div>
      {currentPosts.map((post) => {
        console.log(post);
        return (
          <div key={post.id}>
            <h1>{post.firstName}</h1>
          </div>
        );
      })}
      <div>
        <button>Prev</button>
        {}
        <button>Next</button>
      </div>
    </div>
  );
};

export default Pagination;
