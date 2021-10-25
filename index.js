const express = require("express")

const app= express();
const http = require('http');
const server = http.createServer(app)

const io = require('socket.io')(server)

app.use(express.static("app"));
app.use("/bower_components", express.static('bower_components'))


// app.get('/',function(req , res){
//     res.send("Hello World");
//     console.log("Get Request")
// })

const messages=[{
    userId:1,
    messageId:10,
    userName:"Joe",
    Context:{
        text:"The revolution has started",
        link:"https://adoring-turing-8072a4.netlify.app/"
    },
    likedby:[1,3,4,55,6,6,7,8,6,4,3],
    ts:Date.now()- 1000000


},
{
    userId:1,
    messageId:10,
    userName:"Jotes",
    Context:{
        text:"The revolution has started",
        link:"https://adoring-turing-8072a4.netlify.app/"
    },
    likedby:[1],
    ts:Date.now()- 100000


}
,{
    userId:1,
    messageId:10,
    userName:"Jonahs",
    Context:{
        text:"The revolution has started",
        link:"https://adoring-turing-8072a4.netlify.app/"
    },
    likedby:[3],
    ts:Date.now()- 10000


}
,{
    userId:1,
    messageId:10,
    userName:"Joerge",
    Context:{
        text:"The revolution has started",
        link:"https://adoring-turing-8072a4.netlify.app/"
    },
    likedby:[2],
    ts:Date.now()- 10000000


}
,{
    userId:1,
    messageId:10,
    userName:"Josh",
    Context:{
        text:"The revolution has started",
        link:"https://adoring-turing-8072a4.netlify.app/"
    },
    likedby:[2,3],
    ts:Date.now()- 1000000


}]





io.on('connection', function(socket){
    console.log("connected to a socket")
    socket.emit("messages",messages)
    socket.on ("new-message", function(data){
        messages.push(data)
        io.sockets.emit("messages",messages)
    })

    socket.on ("update-message", function(data){
       const message= messages.filter(
           function(message){
               return message.messageId== data.messageId
           }

       )[0]

       message.likedby= data.likedby;
       console.info("updated_message", message)
        io.sockets.emit("messages",messages)
    })
 
})

server.listen(8080)



