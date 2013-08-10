## Open Sprinkler Raspberry Pi JavaScript Interface  -- ospijs 

Java Script Service and Command line Interface for Raspberry Pi based Open Sprinkler.


#### Open Sprikler Pi
If you have a sprinkler system, chances are you do since you are looking at this. wouldn't it be cool if you could control your sprinkler wall through a remoate device like, laptop, phone or a tablet ?. Yes thats exactly what Open Sprikler Pi enables. Raspberry Pi is bacially a computer (FYI $35) with GPIO. For more on Raspberry Pi check here.

Ray from http://rayshobby.net created an extenstion board for Raspberry Pi that allows interaction with your irrigation system valves. Check out [Ray's website](http://rayshobby.net) for more.

#### Pre-Requisite
Assuming you already have a raspberry pi based iggrigation system setup and now you would like to control the valves you using a command line tool (i.e to open or shut the valves) or use java scripot interface from your application to control the valves, you need few things set up first before we begin

1. GIT
2. WiringPi 
3. NodeJS

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

#### Installation


#### Examples 


#### Usage



