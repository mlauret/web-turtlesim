//Create a Pixi Application
let app = new PIXI.Application({ width: 512, height: 512 });
app.renderer.autoResize = true;
app.renderer.backgroundColor = 0x4556FF;

let turtle;

PIXI.loader
    .add("box-turtle.png")
    .load(setup);


function setup() {
    turtle = new PIXI.Sprite(
        PIXI.loader.resources["box-turtle.png"].texture
    );
    turtle.anchor.set(0.5,0.5);
    turtle.position.set(256,256);
    turtle.speed = 0;
    turtle.steer = 0;
    app.stage.addChild(turtle);
    app.ticker.add((delta) => gameLoop(delta));
}



$(function () {
    var socket = io();
    socket.on("cmd_vel_1", function(msg){
      var array = msg.split(",");
      turtle.speed = parseFloat(array[0]);
      turtle.steer = parseFloat(array[1])*0.0174533;
    });
});

function gameLoop(delta){

    turtle.rotation += turtle.steer;
    turtle.x += turtle.speed * Math.sin(turtle.rotation);
    turtle.y += -turtle.speed * Math.cos(turtle.rotation);

}

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
