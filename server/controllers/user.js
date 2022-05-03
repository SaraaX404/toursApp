const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const secret = "hello bro";
//signup user
exports.signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res.status(400).send({ message: "user is already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    console.log(req);
    console.log(password);
    const hashPassword = await bcrypt.hash(password, salt);

    const result = await User.create({
      email: email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "30d",
    });
    console.log(token);
    return res.status(200).send({ result: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

//sign in user
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email: email });
    if (!oldUser) {
      return res.status(401).send({ msg: "user does not exits" });
    }

    console.log(password);
    console.log(oldUser.name);
    const compare = await bcrypt.compare(password, oldUser.password);

    if (compare) {
      const token = await jwt.sign(
        { email: oldUser.email, id: oldUser._id },
        secret,
        {
          expiresIn: "30d",
        }
      );

      console.log(token);
      return res.status(200).send({ result: oldUser, token: token });
    } else {
      return res.status(401).send("invalid password");
    }
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
};

exports.googleSignIn = async (req, res) => {
  const { email, name, token, googleId } = req.body;
  console.log(req.body);
  try {
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name };
      return res.status(200).send({ result, token });
    }

    const result = await User.create({
      email: email,
      name: name,
      googleId: googleId,
    });

    return res.status({ result, token });
  } catch (error) {
    res.status(500).send(error);
  }
};
