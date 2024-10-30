const usermodel = require("../Models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registeruser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(404).send({
        success: false,
        message: "please fill all fields",
      });
    }
    const userexist = await usermodel.findOne({ email });
    if (userexist) {
      return res.status(299).send({
        success: false,
        message: "user already exist",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = new usermodel({
      username,
      email,
      password: hashedpassword,
    });
    await newuser.save();
    return res.status(200).send({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    console.log("error in regsiter user controller" + error);
  }
};

exports.loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res.status(299).send({
        success: false,
        message: "please fill all fields",
      });
    }
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(299).send({
        success: false,
        message: "user not found",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(299).send({
        success: false,
        message: "password incorrect",
      });
    }

    const token = jwt.sign(
      {
        userid: user._id,
        email: user.email,
      },
      process.env.JWT_KEY
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 30000000,
    });

    return res.status(200).send({
      success: true,
      message: "user login successfull",
    });
  } catch (error) {
    console.log("error in login controller" + error);
  }
};

exports.userinfo = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(299).send({
      sccess: false,
      message: "token not found",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.info = decoded;
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "unauthorrized",
    });
  }
  try {
    const user = await usermodel.findById(req.params.id);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "user not found in user info controller",
      });
    }
    const info = req.info;
    return res.status(200).send({
      success: true,
      message: "user found in user info controller",
      user,
      info,
    });
  } catch (error) {
    console.log("error in user info controller" + error);
  }
};
