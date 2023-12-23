const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 200;

app.use(express.static(__dirname+"/public"));
app.get('/',(req,res) => {
    res.sendFile('./index.html');
});

const io = require("socket.io")(server);

io.on('connection', (socket)=>{
    console.log(socket.id);
});
server.listen(PORT, function() {
    console.log("Server started successfully at port"+PORT)
})
