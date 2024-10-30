import React from "react";
import {useState , useEffect} from "react"
import "./Main.css";
import Sidebar from "../Sidebar/Sidebar";
import Post from "../Post/Post";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import {authActions} from "../Global-State/store"
const Main =() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [post, setpost] = useState([])
  const fetchpost = async ()=>{
    try {
      
      const response = await axios.get("/api/v1/post/getallpost", {withCredentials:true});
      if(!response.data.success){
        localStorage.removeItem("id");
        alert(response.data.message);
        dispatch(authActions.logout());
        navigate("/login");
      }
      setpost(response.data.posts);
      localStorage.setItem("id" , response.data.info.userid);
    } catch (error) {
      console.log("error in main page" + error);
    }
  }
  useEffect(() => {
   fetchpost(); 
  }, [])
  
  return (
    <>
      <div className="Main-Page-Container">
        <Sidebar />
        <div className="Main-Page-Container-Box">
          {post.map((index)=><Post key={index._id} topic={index.topic} thought={index.thought}/>)}
        </div>
      </div>
    </>
  );
};

export default Main;
