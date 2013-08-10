## Open Sprinkler Raspberry Pi JavaScript Interface  -- ospijs 

Java Script Service and Command line Interface for Raspberry Pi based Open Sprinkler.


#### Open Sprikler Pi
If you have a sprinkler system, chances are you do since you are looking at this. wouldn't it be cool if you could control your sprinkler wall through a remoate device like, laptop, phone or a tablet ?. Yes thats exactly what Open Sprikler Pi enables. Raspberry Pi is bacially a computer (FYI $35) with GPIO. For more on Raspberry Pi check here.

Ray from http://rayshobby.net created an extenstion board for Raspberry Pi that allows interaction with your irrigation system valves. Check out [Ray's website](http://rayshobby.net) for more.

#### Pre-Requisite
Assuming you already have a raspberry pi based iggrigation system setup and now you would like to control the valves using a command line tool (i.e to open or shut the valves) or use java scripot interface from your application to control the valves, you need few things set up first your Raspberry Pi before we begin

1. GIT
2. WiringPi 
3. Node.js

###### GIT
GIT is THE version control system. It is just awesome. If you don't have git on your raspberry pi, you can install it with

``` js
sudo apt-get install git-core
```

Before you do this it is a good idea to keep your raspberry pi's raspbian upto date. you can do that using

``` js
sudo apt-get update
sudo apt-get upgrade
```

NOTE: Raspbian is a free operating system based on Debian optimized for the Raspberry Pi hardware. More [here](http://www.raspbian.org)


###### Wiring Pi
[WiringPi](http://wiringpi.com) is a GPIO access library written in C that you can use on Raspberry Pi. It’s designed to be familiar to people who have used the Arduino “wiring” system. To install WiringPi please follow

``` bash
git clone git://git.drogon.net/wiringPi
cd wiringPi
sudo ./build
```
to validate if wiringPi is successfully installed try
``` bash
gpio -v
```
Also make sure the wiringPi share library is installed as well. You can check for that 

``` bash
ls -lrt /usr/lib
  # following files should be present.
lrwxrwxrwx  1 root root       33 May 27 20:31 libwiringPi.so -> /usr/local/lib/libwiringPi.so.2.0
lrwxrwxrwx  1 root root       36 May 27 20:31 libwiringPiDev.so -> /usr/local/lib/libwiringPiDev.so.2.0
```

###### Node.js
Node.js is the JavaScript runtime environment built on Google Chrome's JavaScript runtime. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

Easiest way to install Node.js on your raspberry pi is to download the pre-build binaries for ARM distribution. Pick a latest version for which ARM distribution is available at http://nodejs.org/dist. For example 

``` bash
cd /opt
wget http://nodejs.org/dist/v0.10.13/node-v0.10.13-linux-arm-pi.tar.gz
tar zxf node-v0.10.13-linux-arm-pi.tar.gz
ln -s node-v0.10.13-linux-arm-pi node
# Setup the PATH
PATH=/opt/node/bin:${PATH}
export PATH
```
This should get you node and npm. Npm is node's package manager.

Hardware interface functionality is typically available only to root user. So to make it easy you can add symlinks for node in /bin
``` bash
sudo ln -s /opt/node/bin/node /bin/node
sudo ln -s /opt/node/bin/npm /bin/npm
```

#### Installation


#### Examples 


#### Usage



