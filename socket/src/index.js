import { Server } from 'socket.io';

const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:3000',
    }, 
})
   
 
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
    socket.on('disconnect', () => {  
        console.log('user disconnected'); 
        removeUser(socket.id);
        io.emit('getUsers', users);
    }) 
  
})          