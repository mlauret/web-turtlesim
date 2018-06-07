//Create a Pixi Application
let app = new PIXI.Application({ width: 512, height: 512 });
app.renderer.autoResize = true;
app.renderer.backgroundColor = 0x4556FF;

let turtlesList = [];

function stopMoving(){
    turtle.speed = 0;
    turtle.steer = 0;
}


var socket = io();
socket.on("cmd_vel", function(msg){
  var array = msg.split(",");
  var turtle = turtlesList[parseInt(array[0])]
  turtle.speed = parseFloat(array[1]);
  turtle.steer = parseFloat(array[2])*0.0174533;
  clearTimeout(turtle.timer);
  turtle.timer = setTimeout(stopMoving, 1000);
});

function gameLoop(delta){

    turtlesList.forEach(turtle => {
        turtle.rotation += turtle.steer;
        turtle.x += turtle.speed * Math.sin(turtle.rotation);
        turtle.y += -turtle.speed * Math.cos(turtle.rotation); 
    });
}

function setup() {
    default_turtle = new PIXI.Sprite(
        PIXI.loader.resources["box-turtle.png"].texture
    );
    default_turtle.anchor.set(0.5,0.5);
    default_turtle.position.set(256,256);
    default_turtle.speed = 0;
    default_turtle.steer = 0;
    app.stage.addChild(default_turtle);
    turtlesList.push(default_turtle);
    app.ticker.add((delta) => gameLoop(delta));
}

PIXI.loader
    .add("box-turtle.png")
    .load(setup);


//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
