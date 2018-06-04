# web-turtlesim
Port of ROS Turtlesim on the web with rosnodejs.

## Installation

```
git clone https://github.com/mlauret/web-turtlesim
cd web-turtlesim
npm install
npm start
```

## Usage
This project aim to copy the turtlesim with web-based tools.

Refer to http://wiki.ros.org/turtlesim for usage

## Docker usage

### Using prebuilt image

mathieula/web-turtlesim

### Build your own image

```
docker run -it --env ROS_MASTER_URI=http://<hostname>:11311/ --network host mathieula/web-turtlesim
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
 
