const express = require("express");
const Router = express.Router();

const { signup, signin, googleSignIn } = require("../controllers/user");

Router.post("/signup", signup);
Router.post("/login", signin);
Router.post("/googleSignIn", googleSignIn);
module.exports = Router;
