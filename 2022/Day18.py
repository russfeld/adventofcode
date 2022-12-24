import numpy as np


arr = np.zeros((22, 22, 22), np.int8)

def check(i, j, k):
  output = 0
  if i > 0 and arr[i-1][j][k] == 0:
    output += 1
  elif i == 0:
    output += 1
  if i < 21 and arr[i+1][j][k] == 0:
    output += 1
  elif i == 21:
    output += 1
  if j > 0 and arr[i][j-1][k] == 0:
    output += 1
  elif j == 0:
    output += 1
  if j < 21 and arr[i][j+1][k] == 0:
    output += 1
  elif j == 21:
    output += 1
  if k > 0 and arr[i][j][k-1] == 0:
    output += 1
  elif k == 0:
    output =+ 1
  if k < 21 and arr[i][j][k+1] == 0:
    output += 1
  elif k == 21:
    output += 1
  return output

with open("input18.txt") as file:
  for line in file:
    cube = [int(x) for x in line.split(",")]
    arr[cube[0]][cube[1]][cube[2]] = 1

count = 0
for i in range(22):
  for j in range(22):
    for k in range(22):
      if arr[i][j][k] == 1:
        count += check(i, j, k)
print(count)


