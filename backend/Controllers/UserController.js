const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input fields
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // Check if user already exists
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // Find user by email
  const user = await User.findOne({ email });

  // Compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET, // Ensure this is in your .env file
      { expiresIn: "15m" }
    );
    console.log(process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

//@desc Get current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  // req.user is set by the validateToken middleware
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };