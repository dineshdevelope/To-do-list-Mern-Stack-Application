import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(404).json({ message: "No Token Provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(404).json({ message: "Not Authorized User" });
  }
};

export default authenticate;
