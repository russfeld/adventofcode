import numpy as np


arr = np.zeros((22, 22, 22), np.int8)
points = []

with open("input18.txt") as file:
  for line in file:
    cube = [int(x) for x in line.split(",")]
    arr[cube[0]][cube[1]][cube[2]] = 1
    points.append((cube[0], cube[1], cube[2]))

count = 0
total_cover = 0

for i in range(len(points)):
  point = points[i]
  covered = 0
  if point[0] > 0 and arr[point[0]-1][point[1]][point[2]] == 1: 
    covered += 1
  if point[0] < 21 and arr[point[0]+1][point[1]][point[2]] == 1: 
    covered += 1
  if point[1] > 0 and arr[point[0]][point[1]-1][point[2]] == 1: 
    covered += 1
  if point[1] < 21 and arr[point[0]][point[1]+1][point[2]] == 1: 
    covered += 1
  if point[2] > 0 and arr[point[0]][point[1]][point[2]-1] == 1: 
    covered += 1
  if point[2] < 21 and arr[point[0]][point[1]][point[2]+1] == 1: 
    covered += 1
  total_cover += (covered)

area = (6 * len(points)) - total_cover
print(area)
    
    



