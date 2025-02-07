import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "User Already Exits" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User Created", status: true });
  } catch (error) {
    res.status(404).json({ message: "Error in Create User" });
    console.log(error);
  }
};
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not Registered" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(404).json({ message: "Password Not Match" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
  });
  return res.status(200).json({ token, status: true });
};
