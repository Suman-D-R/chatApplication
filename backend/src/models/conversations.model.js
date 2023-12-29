import { Schema,model } from "mongoose";

const conversationSchema = Schema({
    members: {
        type: Array,
        required: true,
    }
});

export default model('Conversation',conversationSchema)