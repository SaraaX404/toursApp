const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "please provide the name"] },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleId: { type: String, required: false },

});

module.exports = mongoose.model("User", userSchema);
