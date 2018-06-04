var rosnodejs = require('rosnodejs');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/client'));


io.on('connection', function(socket){
  console.log('a user connected');
});




http.listen(3000, function(){
  console.log('listening on *:3000');
});


rosnodejs.initNode('/my_node')
.then(() => {
	const nh = rosnodejs.nh;
	const sub = nh.subscribe('/webturtle', 'geometry_msgs/Pose2D', (msg) => {
	  console.log('Got msg on web-turtle: %j', msg);
    var msg = JSON.parse(JSON.stringify(msg)) 
    console.log(msg)
    turtle_pos = msg.x.toString() +","+msg.theta.toString() ;
    io.emit("position", turtle_pos);
    console.log('message sent');

	});

});


