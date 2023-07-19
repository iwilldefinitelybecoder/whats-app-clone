import Message from "../modal/Message.js";
import Conversation from '../modal/Conversation.js';
import { request, response } from "express";
import UserActivity from "../modal/UserActivity.js";


export const newMessage = async (request, response) => {

    const newMessage = new Message(request.body);
    
    try {
        await newMessage.save();
        await Conversation.findByIdAndUpdate(request.body.conversationId, { message: request.body.text });
        response.status(200).json("Message has been sent successfully");
    } catch (error) {
        response.status(500).json(error);
    }

}

export const getMessage = async (request, response) => {
    try {
        const messages = await Message.find({conversationId: request.params.id });
        const preLoadMessages = await Message.find({receiverId: request.params.id }); 
        response.status(200).json({messages:messages,preLoadMessages});
    } catch (error) {
        console.log(error.message)
        response.status(500).json(error);
    }

}

export const deleteMessage = async (request, response)=>{
    try {
        console.log(request.body)
        await Message.updateMany({_id:request.body._id},{text:request.body.key})
        await Conversation.findByIdAndUpdate(request.body.conversationId, { message: request.body.text });
    } catch (error) {
        response.status(500).json(error);
    }
} 