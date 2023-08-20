import { Schema, model, models } from "mongoose";

const messageSchema = new Schema({
  name: String,
  whatsapp: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const Message = models.message || model("message", messageSchema);

export default Message;
