import React from "react";
import "./Profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {useDispatch} from "react-redux"
import {authActions} from "../Global-State/store"
const Profile = () => {
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const fetchuserinfo = async () => {
    try {
      const userid = localStorage.getItem("id");
      const response = await axios.get(
        `/api/v1/user/userinfo/${userid}`,
        { withCredentials: true }
      );
      setusername(response.data.user.username);
      setemail(response.data.user.email);
      setno(response.data.user.posts);
    } catch (error) {
      console.log("error in profile page" + error);
    }
  };
  useEffect(() => {
    fetchuserinfo();
  }, []);

  return (
    <>
      <div className="Profile-Page-Container">
        <div className="Profile-Page-Container-Box">
          <div className="Profile-Pic"></div>
          <div className="Profile-User-Info">
            <h1>Username : {username}</h1>
            <h1>Email : {email}</h1>
            <button onClick={()=>{
              localStorage.removeItem("id");
              dispatch(authActions.logout());
              navigate("/login");
            }}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
