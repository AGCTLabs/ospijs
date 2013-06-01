#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

void ospi_init();
void ospi_open_shut(int values);

int usage (const char *progName)
{
  fprintf (stderr, "Usage: %s station val \n", progName) ;
  return -1;
}

int main (int argc, char *argv[])
{
  int values = 0;

  if (argc != 3)
    return usage(argv[0]);

  int station = atoi(argv[1]);
  int onOff = atoi(argv[2]);

  if (onOff) 
     values |= 1 << station;
  else 
     values &= ~(1 << station);

  printf("Value %d\n",values);
  ospi_init();
  ospi_open_shut(values);

  return 1;
}
