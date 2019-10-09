var rosnodejs = require("rosnodejs");
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var helper = require("./helperFunctions");

const TurtleSimSpawn = rosnodejs.require("turtlesim").srv.Spawn;

var numberOfTurtle = 1;
var turtleNumber = 1;
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/client"));

io.on("connection", function(socket) {
  console.log("a user connected");
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});

rosnodejs.initNode("/web_turtlesim").then(() => {
  const nh = rosnodejs.nh;
  const subVelDefault = nh.subscribe(
    "turtle1/cmd_vel",
    "geometry_msgs/Twist",
    msg => helper.moveTurtle(msg, 1)
  );
  let subVel = [];
  const srvSpawnFunction = (req, resp) => {
    numberOfTurtle += 1;
    subVel.push(
      nh.subscribe(
        "turtle" + numberOfTurtle + "/cmd_vel",
        "geometry_msgs/Twist",
        msg => helper.moveTurtle(msg, 1)
      )
    );
    return true;
  };

  const srvSpawn = nh.advertiseService(
    "/spawn",
    TurtleSimSpawn,
    srvSpawnFunction
  );
});
