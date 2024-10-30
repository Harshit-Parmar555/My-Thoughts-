import React from "react";
import "./Post.css";
import axios from "axios";
import { toast } from "react-toastify";
const Post = (props) => {
  const handledelete = async () => {
    try {
      const response = await axios.delete(
        `/api/v1/post/deletepost/${props.id}`,
        {withCredentials:true}
      );
      toast(response.data.message);
    } catch (error) {
      console.log("errorr in delete button" + error);
    }
  };
  return (
    <>
      <div className="Post-Container">
        <div className="Post-Topic">
          <h1>{props.topic}</h1>
        </div>
        <div className="Post-Des">
          <p>{props.thought}</p>
        </div>
        <div className="Post-Info">
          {props.id ? <button onClick={handledelete}>Delete</button> : ""}
        </div>
      </div>
    </>
  );
};

export default Post;
