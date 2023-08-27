import {Server} from 'socket.io'

const io = new Server(9000,{
    cors:{
        origin:"https://rahulwhatsup.netlify.app"
    }
})
  



var users=[];

const AddUser=(userData,socketId)=>{
      !users.some(user=>user.sub == userData.sub) && users.push({...userData,socketId});
      
}

const getUser=(ReceivedId)=>{
    const da = users.find((user)=>user.sub===ReceivedId)
    return da
}


io.on("connection",(socket)=>{

    console.log('user connected')

    socket.on('addUser',userData=>{
       
        AddUser(userData,socket.id)
        io.emit("getUser",users)

    })

    
     
    socket.on('sendMessage',data=>{
       

       const user= getUser(data.ReceivedId)
          
       io.to(user.socketId).emit('getMessage',data)
    })
    
})