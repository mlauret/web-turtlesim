var rosnodejs = require("rosnodejs");
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

const TurtleSimSpawn = rosnodejs.require("turtlesim").srv.Spawn;

var numberOfTurtle = 1;
var turtleNumber = 1;
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


rosnodejs.initNode("/web_turtlesim")
.then(() => {
	const nh = rosnodejs.nh;
	const sub_vel_default = nh.subscribe("turtle1/cmd_vel", "geometry_msgs/Twist", (msg) => {
            var data = JSON.parse(JSON.stringify(msg));
            var turtleVel = turtleNumber.toString()+","+data.linear.x.toString() + "," + data.angular.z.toString() ;
            io.emit("cmd_vel", turtleVel);

        });
  	let sub_vel = [];
  	const srv_spawn_function = (req, resp) => {
            numberOfTurtle += 1
            sub_vel.push(nh.subscribe("turtle"+numberOfTurtle+"/cmd_vel", "geometry_msgs/Twist", (msg) => {
            var data = JSON.parse(JSON.stringify(msg));
            var turtleVel = turtleNumber.toString()+","+data.linear.x.toString() + "," + data.angular.z.toString() ;
            io.emit("cmd_vel", turtleVel);
        }));

        return true;
  };

  const srv_spawn = nh.advertiseService("/spawn", TurtleSimSpawn, srv_spawn_function);
});


