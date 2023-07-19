import { Server } from 'socket.io';;
import express from 'express';
import http from 'http'

import axios from 'axios'
const app = express()
const server = http.createServer(app)


const io = new Server(9000, {
    cors: {
        origin: '*'
    }, 
},server)
   

const url  = `http://localhost:8000`

 
let users = []; 
 
const addUser = (userData, socketId) => {
    !users.some(user => user.sub === userData.sub) && users.push({ ...userData, socketId });
}
 
const removeUser = (socketId) => { 
   
    users = users.filter(user => user.socketId !== socketId);
   
}
 
const getUser = (userId) => {  
    return users.find(user => user.sub === userId); 
} 

const fetchUser = (socketId)=>{
    return users.find(user => user.socketId === socketId); 
}
  
io.on('connection',  (socket) => {
    console.log('user connected')
     socket.count = 0
    //connect   
    socket.on("addUser", userData => { 
        addUser(userData, socket.id);   
        io.emit("getUsers", users);
        
    })    
     
    //send message
    socket.on('sendMessage', (data) => { 
        try {
            const user = getUser(data.receiverId); 
            console.log(user)
            io.to(user.socketId).emit('getMessage', data)   
        } catch (error) {
            const senderId = getUser(data.senderId) 
            if(socket.count===0){
                io.to(senderId.socketId).emit('offline')
                console.log('offline emit working')
                socket.count++
            }
            console.log(`user${data.receiverId} offline`)
        }
       
        
    }) 
    
    //update last active for a conversation
    socket.on('upConvoActivity',async data=>{
        const updateConvoActivity = fetchUser(socket.id)
        console.log(`reload working`)
        try {
            const activityDetails = {
                subId:updateConvoActivity.sub,
                email:updateConvoActivity.email,
                conversationId:data?._id
            } 
            console.log(activityDetails)
            const response = await axios.post(`${url}/userActivity/update`,activityDetails)
            console.log(response.data)
            return
        } catch (error) {
            console.log(error.message)
        }
    })
          
    //typing effect   
    socket.on('typing',(data)=>{  
        try {
            const user = getUser(data.receiverId);
            io.to(user.socketId).emit('typer', data) 
        } catch (error) {
            console.log(`user${data.receiverId} offline`)
        }
        
    })     
 
      //ChatDeletion  
      socket.on('deleted',(data)=>{
        try {
            const user = getUser(data.receiverId);
            console.log(user.socketId)
            io.to(user.socketId).emit('deletion', data)   
        } catch (error) {
            console.log(`user${data.receiverId} offline`)
        }
       
    }) 
 
    //disconnect   
    socket.on('disconnect',() => {  
        console.log('user disconnected'); 
            removeUser(socket.id);
            io.emit('getUsers',users);
    })          

})