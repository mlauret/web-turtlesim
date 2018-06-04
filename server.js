var rosnodejs = require('rosnodejs');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var number_of_turtle = 1;

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
	const sub = nh.subscribe('turtle'+number_of_turtle+'/cmd_vel', 'geometry_msgs/Twist', (msg) => {
    var msg = JSON.parse(JSON.stringify(msg));
    var turtle_number = 1; 
    turtle_vel = msg.linear.x.toString() +","+msg.angular.z.toString() ;
    io.emit("cmd_vel_"+turtle_number, turtle_vel);
  });
  number_of_turtle += 1;

});


