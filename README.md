# web-turtlesim
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ec8b909b813048faa30786f2faa14d50)](https://www.codacy.com/app/lmathieu/web-turtlesim?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mlauret/web-turtlesim&amp;utm_campaign=Badge_Grade)

Port of ROS Turtlesim on the web with rosnodejs.

## Installation

```
git clone https://github.com/mlauret/web-turtlesim
cd web-turtlesim
npm install
```

## Run
```
npm start
```
Open your favorite browser and go to http://localhost:3000 to see the turtles

## Usage
This project aim to copy the turtlesim with web-based tools.

Refer to http://wiki.ros.org/turtlesim for usage

## Docker usage



### Using prebuilt image

```
docker run -it --env ROS_MASTER_URI=http://<hostname>:11311/ --network host mathieula/web-turtlesim
```

### Build your own image

```
docker build . -t  <your docker image tag>
```

then you can launch it via :

```
docker run -it --env ROS_MASTER_URI=http://<hostname>:11311/ --network host <your docker image tag>
```

change <hostname> with your hostname (typically display when launching roscore) and <your docker image tag> with the tag used to build the image.



### Working stuff : 
 - turtleX/cmd_vel Subscriber
 
### Non-Working stuff (todo) : 
 - Multiple turtle
 - Collision on wall
 - The Pen
 - Background color Parameters
 - turtleX/pose Subscriber
 - clear Service
 - reset Service
 - kill Service
 - spawn Service
 - turtleX/set_pen Service
 - turtleX/teleport_absolute Service
 - turtleX/teleport_relative Service
 - Mimic Interface
 
