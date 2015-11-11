var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    io.emit('user count', 'Someone connected. There are ' + io.engine.clientsCount + ' users online.')
    socket.on('disconnect', function() {
        console.log('user disconnected');
        io.emit('user count', 'Someone disconnected. There are ' + io.engine.clientsCount + ' users online.')
    });
    socket.on('chat message', function(msg) {
        console.log('incoming message: ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});