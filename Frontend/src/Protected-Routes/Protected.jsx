import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import {useRef} from "react"
const Protected = () => {
  
  const islogin = useSelector((state)=>state.islogin)
  return islogin ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
