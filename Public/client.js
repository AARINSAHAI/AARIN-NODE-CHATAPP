const socket = io();
const { Server } = require("socket.io");
var username;
username  = prompt("Please enter your name");

socket.emit('user-joined', username);

socket.on('user-connected', (users)=> {
    var joining_div = document.createElement('div');
    joining_div.classList.add('user_join');
    joining_div.innerHTML = `<p><strong> ${users}</strong> has joined</p>`;
    document.getElementById('texts').appendChild(joining_div);
});
var message = document.getElementById('chat_box');
message.addEventListener('keyup', function(e){
    console.log(e);
   var msg_details = {
    name: username,
    textToSend : message.value
   }
   if(e.key == "Enter"){
    var out_msg = document.createElement('div');
    out_msg.classList.add('outgoing_msg');
    out_msg.innerHTML = `<p> ${msg_details.textToSend}</p>`
    document.getElementById('texts').appendChild(out_msg);
    message.value = '';
    socket.emit('outgoing_msg', msg_details);
   }
});

socket.on('incoming_msg', (msg_data)=>{
    var in_msg = document.createElement('div');
    in_msg.classList.add('incoming_msg');
    in_msg.innerHTML = `<p> ${msg_data.textToSend} </p>`
    document.getElementById('texts').appendChild(in_msg);
    message.value = '';
})