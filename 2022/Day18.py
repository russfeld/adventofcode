import numpy as np
from collections import deque


def flood_fill(arr):
  queue = deque()
  queue.append((0, 0, 0))
  while len(queue) > 0:
    point = queue.popleft()
    if arr[point[0]][point[1]][point[2]] == 0:
      arr[point[0]][point[1]][point[2]] = 2
      if point[0] > 0:
        queue.append((point[0] - 1, point[1], point[2]))
      if point[0] < 23:
        queue.append((point[0] + 1, point[1], point[2]))
      if point[1] > 0:
        queue.append((point[0], point[1] - 1, point[2]))
      if point[1] < 23:
        queue.append((point[0], point[1] + 1, point[2]))
      if point[2] > 0:
        queue.append((point[0], point[1], point[2] - 1))
      if point[2] < 23:
        queue.append((point[0], point[1], point[2] + 1))


arr = np.zeros((24, 24, 24), np.int8)
points = []

with open("input18.txt") as file:
  for line in file:
    cube = [(int(x) + 1) for x in line.split(",")]
    arr[cube[0]][cube[1]][cube[2]] = 1
    points.append((cube[0], cube[1], cube[2]))

count = 0
total_cover = 0

for i in range(len(points)):
  point = points[i]
  covered = 0
  if point[0] > 1 and arr[point[0]-1][point[1]][point[2]] == 1: 
    covered += 1
  if point[0] < 22 and arr[point[0]+1][point[1]][point[2]] == 1: 
    covered += 1
  if point[1] > 1 and arr[point[0]][point[1]-1][point[2]] == 1: 
    covered += 1
  if point[1] < 22 and arr[point[0]][point[1]+1][point[2]] == 1: 
    covered += 1
  if point[2] > 1 and arr[point[0]][point[1]][point[2]-1] == 1: 
    covered += 1
  if point[2] < 22 and arr[point[0]][point[1]][point[2]+1] == 1: 
    covered += 1
  total_cover += (covered)

area = (6 * len(points)) - total_cover
print(area)
    
flood_fill(arr)

area = 0
for i in range(len(points)):
  point = points[i]
  if arr[point[0]-1][point[1]][point[2]] == 2: 
    area += 1
  if arr[point[0]+1][point[1]][point[2]] == 2: 
    area += 1
  if arr[point[0]][point[1]-1][point[2]] == 2: 
    area += 1
  if arr[point[0]][point[1]+1][point[2]] == 2: 
    area += 1
  if arr[point[0]][point[1]][point[2]-1] == 2: 
    area += 1
  if arr[point[0]][point[1]][point[2]+1] == 2: 
    area += 1

# for i in range(1, 6):
#   for j in range(1, 6):
#     for k in range(1, 9):
#       print(arr[i][j][k], end="")
#     print()
#   print()

print(area)


