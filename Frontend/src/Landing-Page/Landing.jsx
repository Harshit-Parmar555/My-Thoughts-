import React from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="Landing-Page-Container">
        <div className="Landing-Page-Container-Heading">
          <h1>Share Your Thought's With World </h1>
        </div>
        <div className="Landing-Page-Container-Description">
          <p>
            Share Your Unique ideas , experiences and thoughts here through
            posts which can help other in their life.
          </p>
        </div>
        <div className="Landing-Page-Container-Button">
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Start The Journey
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing;
