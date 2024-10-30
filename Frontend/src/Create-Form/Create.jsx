import React from "react";
import { useState } from "react";
import "./Create.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Create = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (userdata) => {
    setloading(true);
    const response = await axios.post(
      "/api/v1/post/createpost",
      { topic: userdata.topic, thought: userdata.thought, user: id },
      { withCredentials: true }
    );
    if (!response.data.success) {
      toast(response.data.message);
      setloading(false);
    }
    toast(response.data.message);
    setloading(false);
  };
  return (
    <>
      <div className="Create-Container">
        <div className="Create-Container-Form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("topic", {
                required: {value:true,message:"Please enter topic"}
              })}
              placeholder="Enter Topic"
              type="text"
            />
            {errors.topic && toast(errors.topic.message)}
            <input
              style={{ height: "40%" }}
              {...register("thought" , {
                required:{value:true, message:"Please enter thought"}
              })}
              type="text"
              placeholder="Enter Thought"
            />
            {errors.thought && toast(errors.thought.message)}
            {loading ? (
              <button style={{ opacity: "0.4" }} disabled>
                wait...
              </button>
            ) : (
              <button type="submit">Create Thought</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
