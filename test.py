import sys
import time

while True:
  #  print("Hello", end="\n", flush=True)
    print("ERR", end="\n", file=sys.stderr, flush=True)
    time.sleep(5)