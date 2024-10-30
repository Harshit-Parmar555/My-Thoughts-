import React from "react";
import { useState } from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
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
        "/api/v1/user/registeruser",
        {
          username: userdata.username,
          email: userdata.email,
          password: userdata.password,
        }
      );
      if (response.data.success) {
        setloading(false);
        toast("User Created Successfully");
        navigate("/login");
      } else {
        toast(response.data.message);
        setloading(false);
      }
    } catch (error) {
      console.log("Error in register page" + error);
    }
  };
  return (
    <>
      <div className="Register-Page-Container">
        <div className="Register-Page-Container-Form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("username", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Minimum Length for Usernname is 3",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum Length for Username is 10",
                },
              })}
              placeholder="Enter Username"
              type="text"
              required
            />
            {errors.username && alert(errors.username.message)}
            <input
              {...register("email", { required: true })}
              placeholder="Enter Email"
              type="email"
              required
            />
            <input
              {...register("password", {
                required: true,
                min: { value: 5, message: "Minimum Length for Password is 5" },
                maxLength: {
                  value: 10,
                  message: "Maximum Lenght for password is 10",
                },
              })}
              placeholder="Enter Password"
              type="text"
              required
            />
            {errors.password && alert(errors.password.message)}

            {loading ? (
              <button style={{ opacity: "0.4" }} disabled>
                wait...
              </button>
            ) : (
              <button type="submit">Register</button>
            )}

            <Link to="/login">Already Have an Account ??</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
