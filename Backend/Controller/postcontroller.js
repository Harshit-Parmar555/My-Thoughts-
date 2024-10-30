const mongoose = require("mongoose");
const postmodel = require("../Models/postmodel");
const usermodel = require("../Models/usermodel");
const jwt = require("jsonwebtoken");

exports.createpost = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(299).send({
        success: false,
        message: "Unauthorized",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded;
    } catch (error) {
      return res.status(299).send({
        success: false,
        message: "unauthorized",
      });
    }
    const { topic, thought, user } = req.body;
    if (!topic || !thought || !user) {
      return res.status(404).send({
        success: false,
        message: "please fill all fields",
      });
    }
    const existuser = await usermodel.findById(user);
    if (!existuser) {
      return res.status(404).send({
        success: false,
        message: "user not found in create post controller",
      });
    }
    const newpost = new postmodel({ topic, thought, user });
    const session = await mongoose.startSession();
    await session.startTransaction();
    await newpost.save({ session });
    existuser.posts.push(newpost);
    await existuser.save({ session });
    await session.commitTransaction();

    await newpost.save();

    return res.status(200).send({
      success: true,
      message: "post added successfully",
    });
  } catch (error) {
    console.log("error in create post controller" + error);
  }
};

exports.allpost = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(299).send({
        success: false,
        message: "token not found",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded;
    } catch (error) {
      return res.status(299).send({
        success: false,
        message: "unauthorized",
      });
    }
    const posts = await postmodel.find();
    const info = req.user;
    return res.status(200).send({
      success: true,
      message: "all post fetched",
      posts,
      info,
    });
  } catch (error) {
    console.log("error in get all post controller", error);
  }
};

exports.deletepost = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).send({
      success: false,
      message: "token not found",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "unauthorized",
    });
  }
  try {
    const post = await postmodel.findById(req.params.id);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "cannot get post",
      });
    }
    const deletepost = await postmodel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await deletepost.user.posts.pull(post);
    await deletepost.user.save();
    res.status(200).send({
      success: true,
      message: "post deleted successfully",
    });
  } catch (error) {
    console.log("error in delete post controller", error);
  }
};

exports.userposts = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).send({
      sccess: false,
      message: "token not found",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "unauthorrized",
    });
  }
  try {
    const user = await usermodel.findById(req.params.id).populate("posts");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "cannot get user in get post by user controller",
      });
    }
    const posts = user.posts;
    return res.status(200).send({
      success: true,
      message: "user found",
      posts,
    });
  } catch (error) {
    console.log("error in user posts controller " + error);
  }
};
