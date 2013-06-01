rm -rf lib build
mkdir lib build

gcc -fPIC -g -c -Wall src/ospijs.c  -o build/ospijs.o
gcc -shared -Wl,-soname,libospi.so -o libospi.so.1.0.1 build/ospijs.o -lc
mv libospi.so.1.0.1 lib
cd lib
ln -s libospi.so.1.0.1 libospi.so
cd ../
gcc -L./lib -Wall examples/ospi.c -o build/ospi -lospi -lwiringPi
