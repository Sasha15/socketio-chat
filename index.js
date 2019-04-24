var app = require('express')();
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        socket.broadcast.emit('pull message', msg);
        socket.emit('own message', msg);
    })
})

http.listen(port, function() {
    console.log('listen on ' + port);
});