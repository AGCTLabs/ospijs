#include <stdio.h>
#include <errno.h>
#include <string.h>

#include <wiringPi.h>

/* GPIO PIN DEFINES */
#define PIN_SR_CLK  4
#define PIN_SR_NOE 17
#define PIN_SR_DAT 27
#define PIN_SR_LAT 22

#define False 0
#define True 1

void enableShiftRegisterOutput() {
   digitalWrite(PIN_SR_NOE, False);
}

void disableShiftRegisterOutput() {
   digitalWrite(PIN_SR_NOE, True);
}

void setShiftRegister(int value) {
   int i=0, bit;
   digitalWrite(PIN_SR_CLK, True);
   digitalWrite(PIN_SR_LAT, False);
   for (i=15; i >= 0; i--) {
      bit = value & (1 << i);
      digitalWrite(PIN_SR_CLK, False);
      digitalWrite(PIN_SR_DAT, bit > 0 ? 1 : 0);
      digitalWrite(PIN_SR_CLK, True);
   }
   digitalWrite(PIN_SR_LAT, True);
}

void ospi_init() {
  wiringPiSetupGpio () ;

  pinMode(PIN_SR_CLK, OUTPUT);
  pinMode(PIN_SR_NOE, OUTPUT);
  disableShiftRegisterOutput();
  pinMode(PIN_SR_DAT, OUTPUT);
  pinMode(PIN_SR_LAT, OUTPUT);

  setShiftRegister(False);
  enableShiftRegisterOutput();
}

void ospi_open_shut(int values) {
  setShiftRegister(values);
}
