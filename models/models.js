const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema({ name: String, password: String, owner: String, service: String })
);

const Admin = mongoose.model(
  "Admin",
  new Schema({ name: String, password: String})
);

module.exports = {
  Admin,
  User,
};
