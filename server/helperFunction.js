module.exports = {
    moveTurtle: function (msg, turtlenumber) {
        var data = JSON.parse(JSON.stringify(msg));
        var turtleVel = turtleNumber.toString()+","+data.linear.x.toString() + "," + data.angular.z.toString() ;
        io.emit("cmd_vel", turtleVel);

    }
  };
  