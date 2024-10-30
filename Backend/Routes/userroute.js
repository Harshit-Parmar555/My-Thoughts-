const express = require("express");
const { registeruser, loginuser , userinfo } = require("../Controller/usercontroller");
const userrouter = express.Router();

userrouter.post("/registeruser", registeruser);
userrouter.post("/loginuser", loginuser);
userrouter.get("/userinfo/:id" , userinfo)
// userrouter.get("/logout" , logoutuser);

module.exports = userrouter;
