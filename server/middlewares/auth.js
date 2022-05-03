const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secret = "hello bro";

const auth = async (req, res, next) => {
  try {
    if(!req.headers.authorization){
      return res.status(401).send({message:"No token Provided"})
    }
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.userID = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = await User.findOne({ googleId });
      req.userID = user?._id;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = auth;
