import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  role: String,
});

const User = models.user || model("user", userSchema);

export default User;
