## Open Sprinkler Raspberry Pi JavaScript Interface  -- ospijs 

Java Script Service and Command line Interface for Raspberry Pi based Open Sprinkler.


#### Open Sprikler Pi
If you have a sprinkler system, chances are you do since you are looking at this. wouldn't it be cool if you could control your sprinkler valve through a remoate device like, laptop, phone or a tablet ?. Yes thats exactly what Open Sprikler Pi enables. Raspberry Pi is bacially a computer (Its just $35. Can you believe that ?) with GPIO. For more on Raspberry Pi check [here](http://www.raspberrypi.org/quick-start-guide).

Ray from http://rayshobby.net created an extenstion board for Raspberry Pi that allows interaction with your irrigation system valves. Check out [Ray's website](http://rayshobby.net) for more.

#### Pre-Requisite
Assuming you already have a raspberry pi based irrigation system setup and now you would like to control their valves using a command line tool (i.e to open or shut the valves) or use java script interface from your application to control the valves, you need few things set up first on your Raspberry Pi before we begin

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
cd $HOME
# you might want to get a latest version.
wget http://nodejs.org/dist/v0.10.13/node-v0.10.13-linux-arm-pi.tar.gz
tar zxf node-v0.10.13-linux-arm-pi.tar.gz
# setup a symlink to this version. makes it easy to have multiple versions
ln -s $HOME/node-v0.10.13-linux-arm-pi node
# Setup the PATH
PATH=$HOME/node/bin:${PATH}
export PATH
```
This should get you node and npm. Npm is node's package manager.

Hardware interface functionality is typically available only to root user. So to make it easy you can add symlinks for node in /bin
``` bash
sudo ln -s $HOME/node/bin/node /bin/node
sudo ln -s $HOME/node/bin/npm  /bin/npm
```

#### Installation
Now that we have all our pre-reqs met it is fairly straigforward to install ospijs. To install just do
``` bash
npm install -g ospi
```
This would install ospijs under $HOME/node/ folder. I.e  -g option would install ospijs globally for all node projects. Alternatively you could just install it into a specific folder without -g option.

To enable root access you could create a symlink
``` bash
sudo ln -s $HOME/node/bin/ospi /bin/ospi
```

#### Usage
To invoke ospi you must have root access. 

``` bash
sudo ospi

  Usage: ospi [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -o, --open <stations>  List of stations to open
    -s, --shut [stations]  List of stations to open. Defaults to shut all stations.
```
to open valves 6,5 
``` bash
sudo ospi --open 6,5
```

to shut off all the values
``` bash
sudo opsi --shut
```

With these two basic commands you could easily set a cronjob. For example 
``` bash
0     5    *   *   *     /bin/ospi --open 6
10    5    *   *   *     /bin/ospi --shut
12    6    *   *   *     /bin/ospi --open 3
16    6    *   *   *     /bin/ospi --shut
20    6    *   *   *     /bin/ospi --open 5
23    6    *   *   *     /bin/ospi --shut
30    6    *   *   *     /bin/ospi --open 4
33    6    *   *   *     /bin/ospi --shut
40    6    *   *   *     /bin/ospi --open 7
43    6    *   *   *     /bin/ospi --shut
```
In the above a cron job would open valve 6 at 5 AM and shut it off at 5.10 AM every dat. It should be fairly easy to write a wrapper script that could fetch the current condition and conditinally call ospi to open the valve based on weather factors.

On the otherhand if you would like to control the valves using your node app then you can use the ospi service apis. To do that you need specify a dependency on ospi in your package.json and then install the node modules. This will initialzie the ospi module
``` bash
var ospi = require('ospi');
```

to open 
``` bash
ospi.open(6); // will open station 6
```

to shut
``` bash
ospi.shut(6);
```

to open and shut
``` bash
ospi.control({"open": [1,2,3], "close": [4,5]});
```

to shut all valves
``` bash
ospi.shut();
```
or 
``` bash
ospi.control({shutAll:true});
```
