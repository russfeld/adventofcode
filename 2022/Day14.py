import numpy as np


DEBUG = True


def dprint_arr(arr):
  if DEBUG:
    shape = arr.shape
    for i in range(shape[0]):
      for j in range(shape[1]):
        if arr[i][j] == 0:
          print(". ", end="")
        elif arr[i][j] == 1:
          print("# ", end="")
        else:
          print("o ", end="")
      print()

def dprint(msg, end="\n"):
  if DEBUG:
    # print(msg, end=end)
    pass


def fill(arr, start, end):
  if start is not None:
    if start[0] == end[0]:
      step = 1
      if start[1] > end[1]:
        step = -1
      for i in range(start[1], end[1] + step, step):
        arr[i][start[0]] = 1
    else:
      step = 1
      if start[0] > end[0]:
        step = -1
      for i in range(start[0], end[0] + step, step):
        arr[start[1]][i] = 1

def drop_sand(arr, top, bottom):
  point = (0, top)
  while arr[point[0]][point[1]] == 0:
    # fall off
    if point[0] > bottom:
      dprint("fall")
      return False
    # try down
    if arr[point[0] + 1][point[1]] == 0:
      dprint("down")
      point = (point[0] + 1, point[1])
    # try left
    elif arr[point[0] + 1][point[1] - 1] == 0:
      dprint("left")
      point = (point[0] + 1, point[1] - 1)
    elif arr[point[0] + 1][point[1] + 1] == 0:
      dprint("right")
      point = (point[0] + 1, point[1] + 1)
    else:
      dprint("stop")
      arr[point[0]][point[1]] = 2
      return True
  return False
  


with open("input14.txt") as file:
  arr = np.zeros((1000, 1000), np.int8)
  bottom = 0
  for line in file:
    line = line.replace(" -> ", " ")
    points = line.split(" ")
    prev = None
    for point in points:
      point = [int(x) for x in point.split(",")]
      fill(arr, prev, point)
      if point[1] > bottom:
        bottom = point[1]
      prev = point
  # gotta start at the top
  top = 500
  bottom += 2
  print(bottom)
  # dprint("  " * top, end="")
  # dprint("^")
  # dprint_arr(arr)
  count = 0
  while drop_sand(arr, top, bottom):
    count += 1
    # dprint_arr(arr)
  # dprint_arr(arr)
  print(count)
  
  # add floor
  for i in range(1000):
    arr[bottom][i] = 1
  while drop_sand(arr, top, bottom):
    count += 1
  print(count)

