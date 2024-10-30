const express = require("express");
const {createpost , allpost , deletepost , userposts} = require("../Controller/postcontroller")

const postrouter = express.Router()

// get all posts
postrouter.get("/getallpost" ,allpost );

// create new posts
postrouter.post("/createpost" , createpost);

// delete a post
postrouter.delete("/deletepost/:id" , deletepost);

// get posts by user id
postrouter.get("/userposts/:id" , userposts)

module.exports = postrouter

