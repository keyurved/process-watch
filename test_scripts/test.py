import sys
import time


i = 0

while True:
    print("Hello", end="\n", flush=True)
    i += 1
    if i == 10:
      exit("Exited")
    time.sleep(5)