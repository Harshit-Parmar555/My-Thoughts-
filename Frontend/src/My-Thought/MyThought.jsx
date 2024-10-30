import React, { useEffect } from "react";
import "./MyThought.css";
import Post from "../Post/Post";
import axios from "axios";
import { useState } from "react";
const MyThought = () => {
  const [mypost, setmypost] = useState([]);
  const id = localStorage.getItem("id")
  const fetchpost = async () => {
    try {
      const response = await axios.get(
        `/api/v1/post/userposts/${id}`,
        { withCredentials: true }
      );
      if (!response.data.success) {
        alert(response.data.success);
      }
      setmypost(response.data.posts);
    } catch (error) {
      console.log("error in my thoughts page" + error);
    }
  };
  useEffect(() => {
    fetchpost();
  }, []);

  return (
    <>
      <div className="Mythought-Container">
        <div className="Mythought-Container-Box">
          {mypost.map((index) => (
            <Post key={index._id} id={index._id} topic={index.topic} thought={index.thought} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyThought;
