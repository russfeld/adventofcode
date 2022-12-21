from collections import deque


def can_reach(char1, char2):
  if char2 == "S":
    char2 = "a"
  if char2 == "E":
    char2 = "z"
  if ord(char1) + 1 >= ord(char2):
    return True
  return False


with open("david12.txt") as file:
  graph = {}
  graph2 = {}
  matrix = [line.strip() for line in file]
  start = None
  end = None
  for i in range(len(matrix)):
    for j in range(len(matrix[i])):
      char = matrix[i][j]
      graph[(i, j)] = []
      if char == "S":
        start = (i, j)
        char = "a"
      if char == "E":
        end = (i, j)
        char = "z"
      if i > 0 and can_reach(char, matrix[i-1][j]):
        graph[(i, j)].append((i-1, j))
        if (i-1, j) not in graph2:
          graph2[(i-1, j)] = []
        graph2[(i-1, j)].append((i, j))
      if i < len(matrix) - 1 and can_reach(char, matrix[i+1][j]):
        graph[(i, j)].append((i+1, j))
        if (i+1, j) not in graph2:
          graph2[(i+1, j)] = []
        graph2[(i+1, j)].append((i, j))
      if j > 0 and can_reach(char, matrix[i][j-1]):
        graph[(i, j)].append((i, j-1))
        if (i, j-1) not in graph2:
          graph2[(i, j-1)] = []
        graph2[(i, j-1)].append((i, j))
      if j < len(matrix[i]) - 1 and can_reach(char, matrix[i][j+1]):
        graph[(i, j)].append((i, j+1))
        if (i, j+1) not in graph2:
          graph2[(i, j+1)] = []
        graph2[(i, j+1)].append((i, j))

# part 1
# BFS
q = deque()
parents = {}
explored = [start]
q.append(start)
while len(q) > 0:
  curr = q.popleft()
  if curr == end:
    print("found")
    break
  for next in graph[curr]:
    if next not in explored:
      explored.append(next)
      parents[next] = curr
      q.append(next)

path = deque()
while curr != start:
  path.appendleft(parents[curr])
  curr = parents[curr]
print(len(path))


# part 2
# BFS
q = deque()
parents = {}
explored = [end]
q.append(end)
while len(q) > 0:
  curr = q.popleft()
  if matrix[curr[0]][curr[1]] == "a" or matrix[curr[0]][curr[1]] == "S":
    print("found")
    break
  for next in graph2[curr]:
    if next not in explored:
      explored.append(next)
      parents[next] = curr
      q.append(next)

path = deque()
while curr != end:
  path.appendleft(parents[curr])
  curr = parents[curr]

# print(path)
print(len(path))