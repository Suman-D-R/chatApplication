import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  conversationId: {
    type: String,
    require: true
  },
  senderId: {
    type: String,
  },
  message: {
    type: String,
  },
});

export default model('Message', messageSchema);
