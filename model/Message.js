import { Schema, model, models } from "mongoose";

const messageSchema = new Schema({
  name: String,
  whatsapp: String,
  email: String,
  message: String,
});

const Message = models.message || model("message", messageSchema);

export default Message;
