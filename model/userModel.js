const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  occupation: { type: String, required: true },
  profile_picture: { type: String, required: true },
});

const user = mongoose.model("Users", userSchema);

module.exports = user;
