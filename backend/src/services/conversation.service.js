import Conversation from "../models/conversations.model";
import User from '../models/user.model';

export const createConversation = async (data) => {
  try {
    const { senderId, receiverId } = data;
    const conversation = new Conversation({ members: [senderId, receiverId] });
    await conversation.save();
    return conversation;
  } catch (error) {
    throw error;
  }
};


export const findConversation = async (user_id) => {
    try {
      console.log(`Searching for conversation with user_id: ${user_id}`);
      const conversation = await Conversation.findOne({ members: { $in: [user_id] } });
  
      if (!conversation) {
        console.log('Conversation not found');
        throw new Error('Conversation not found');
      }
  
      const receiverId = conversation.members.find((member) => member !== user_id);
      const user = await User.findById(receiverId);
  
      if (!user) {
        console.log('User not found');
        throw new Error('User not found');
      }
  
      console.log('Conversation found:', conversation);
      return {
        user: {
          receiverId: user._id,
          email: user.email,
          fullName: user.fullName
        },
        conversationId: conversation._id
      };
    } catch (error) {
      console.error('Error in findConversation:', error);
      throw error;
    }
  };
