import React from "react";
import { useState } from "react";
import "./Login.css";
import { set, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../Global-State/store";
import { toast } from "react-toastify";
const Login = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (userdata) => {
    try {
      setloading(true);
      const response = await axios.post(
        "/api/v1/user/loginuser",
        { email: userdata.email, password: userdata.password },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setloading(false);
        toast("Login successfull");
        dispatch(authActions.login());
        navigate("/main");
      } else {
        toast(response.data.message);
        setloading(false);
      }
    } catch (error) {
      console.log("error in login page" + error);
    }
  };
  return (
    <>
      <div className="Login-Page-Container">
        <div className="Login-Page-Container-Form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("email", { required: true })}
              placeholder="Enter Email"
              type="email"
              required
            />
            <input
              {...register("password", { required: true })}
              placeholder="Enter Password"
              type="text"
              required
            />

            {loading ? (
              <button style={{ opacity: "0.4" }} disabled>
                wait...
              </button>
            ) : (
              <button type="submit">Login</button>
            )}

            <Link to="/register">Not a User ??</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
