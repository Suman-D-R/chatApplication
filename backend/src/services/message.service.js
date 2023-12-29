import Message from '../models/message.model';

export const sendMessage = async (data) =>{
    try{
        console.log("hello",data)
        const { conversationId, senderId, message } = data;
        const newMessage = await Message.create({conversationId:conversationId, senderId:senderId, message:message });
        console.log(newMessage,"hellooo")

        return newMessage;
    }
    catch(error){
        throw error
    }
}

export const getMessage = async  (id)=>{
    try{
        const messages = await Message.find({conversationId:id});

        return messages;
    }
    catch(error){
        throw error
    }
}