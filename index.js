var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Hello Socket</h1><div>This is a socket server, nothing to see on page :)</div>');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('create-mesh', function(msg){
   console.log('new-mesh: ' + JSON.stringify(msg, null, 2));
   socket.broadcast.emit('new-mesh', msg);
  });
  socket.on('position-change', function(msg){
   console.log('position-change: ' + JSON.stringify(msg, null, 2));
   socket.broadcast.emit('position-changed', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
