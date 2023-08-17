const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// not using dotenv  method for data security
// const jwtSecret = "Anurag.721";

exports.signUp = async (req, res) => {
  try {
    const { userName, email, password, userType } = req.body;
    console.log("all data in backend",userName, email, password, userType)
    if (!userName || !email || !password || !userType) {
      return res.status(401).json({
        success: false,
        message: "All the fields  are required",
      });
    }
    // check existing user

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(402).json({
        success: false,
        message: "User already exists",
      });
    }
    console.log("existingUser", existingUser);

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name:userName,
      email,
      password: hashedPassword,
      userType,
    });
    console.log("createdUser", createdUser);
    return res.status(200).json({
      success: true,
      message: "User signed In successfully",
      createdUser,
    });
  } catch (error) {
    console.log("failed while signup", error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body.email;
    
    // if (!email || !password) {
    //   return res.status(405).json({
    //     success: false,
    //     message: "all fields are required",
    //   });
    // }
    console.log("user login data1",req.body.email)
    const existingUser = await User.findOne({email});
    console.log("existingUser",existingUser)
    if (!existingUser) {
      return res.status(408).json({
        success: false,
        message: "user is not registered",
      });
    }

    if (await bcrypt.compare(password, existingUser.password)) {
      const token = jwt.sign(
        {
          email: existingUser.email,
          id: existingUser._id,
          userType: existingUser.userType,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      existingUser.token = token;
      existingUser.password = undefined;
      // req.user = existingUser;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user:existingUser,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
       
      });
    }
  } catch (error) {
    return res.status(404).json({
      succes: false,
      message: "unable to login",
      error
    });
  }
};
