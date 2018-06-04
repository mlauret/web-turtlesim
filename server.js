var rosnodejs = require("rosnodejs");
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var numberOfTurtle = 1;

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/client"));


io.on("connection", function(socket){
  console.log("a user connected");
});




http.listen(3000, function(){
  console.log("listening on *:3000");
});


rosnodejs.initNode("/my_node")
.then(() => {
	const nh = rosnodejs.nh;
	const sub = nh.subscribe("turtle"+numberOfTurtle+"/cmd_vel", "geometry_msgs/Twist", (msg) => {
    var data = JSON.parse(JSON.stringify(msg));
    var turtleNumber = 1; 
    var turtleVel = data.linear.x.toString() + "," + data.angular.z.toString() ;
    io.emit("cmd_vel_"+turtleNumber, turtleVel);
  });
  numberOfTurtle += 1;

});


