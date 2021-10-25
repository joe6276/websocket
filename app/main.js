const userid = localStorage.getItem("userId") || randomid()
localStorage.setItem("userId", userid)
console.log("Hello am User "+ userid)


function randomid(){
    Math.floor(Math.random * 1e11)
}
let  messageCached;
const socket = io.connect('http://localhost:8080',{forceNew:true});
socket.on("messages", function(data){
    console.info(data)
    messageCached=data

    render()

   
})

function render(){
const data= messageCached
    const html = data.sort( function(a,b){
         return a.ts-b.ts;
    })
    
    
    .map(function(data,index ){
        return(
       
            `
            <form class="message" onsubmit="return likeMessage(messageCached[${index}])">
            <div class ='name'>
                ${data.userName}
            </div> 
            
            <a href =${data.Context.link} class='message' target= blank>
                ${data.Context.text}
            </a>

            <div class="time">
            ${moment(data.ts).fromNow()}
            </div>

            <input class="likes-count" type="submit" value="${data.likedby.length} Likes ">
           </form>
            `
        )
    }).join(" ")
    
    document.getElementById("messages").innerHTML=html

}


function likeMessage(message){
const index= message.likedby.indexOf(userid);

if(index<0){
    message.likedby.push(userid);
}else{
  message.likedby.splice(index,1) 
}
socket.emit("update-message",message)
render()
return false;
}

function addMessage(e){
  try{

  
    const payload= {
        messageId: randomid(),
        userName: document.getElementById("username").value,
        Context:{
        text:document.getElementById("text").value,
        email: document.getElementById("email").value
       
        },
        ts:Date.now(),
        likedby:[]

    }
  socket.emit("new-message", payload)
    return false;


}catch(error){
console.log(error)
}

}

function addHello(){
    console.log("Hello")
}