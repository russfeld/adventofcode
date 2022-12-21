import re
from collections import deque
from itertools import permutations


class Node:

  def __init__(self, name, rate, outputs):
    self.name = name
    self.rate = rate
    self.outputs = outputs
  

  def __str__(self):
    return "{} : {} : {}\n".format(self.name, self.rate, self.outputs)

  def __repr__(self):
    return str(self)


def find_path(graph, start, dest):
  # from day 12
  # BFS
  q = deque()
  parents = {}
  explored = [start]
  q.append(start)
  while len(q) > 0:
    curr = q.popleft()
    if curr == dest:
      break
    for next in graph[curr].outputs:
      if next not in explored:
        explored.append(next)
        parents[next] = curr
        q.append(next)

  path = deque()
  while curr != start:
    path.appendleft(parents[curr])
    curr = parents[curr]
  return len(path)




with open("test16.txt") as file:
  # dictionary of all nodes
  graph = {}
  # set of nodes with valves to be opened
  valves = set()
  prog = re.compile("^Valve (\w*) has flow rate=(\d*); tunnel[s]? lead[s]? to valve[s]? ([\w, ]*)$")
  for line in file:
    result = prog.match(line)
    valve = result[1]
    rate = int(result[2])
    outputs = [item.strip() for item in result[3].split(",")]
    graph[valve] = Node(valve, rate, outputs)
    if rate > 0:
      valves.add(valve)
  paths = {}
  paths["AA"] = {}
  for valve in valves:
    paths[valve] = {}
    for dest in valves:
      if valve == dest:
        continue
      if dest in paths:
        paths[valve][dest] = paths[dest][valve]
      else:
        paths[valve][dest] = find_path(graph, valve, dest)
    paths["AA"][valve] = find_path(graph, "AA", valve)
  print(paths)
  # paths should now list the shortest paths between valves that can be opened
  visited = set()
  current = "AA"
  remain = 30
  output = 0
  while visited != valves:
    max_next = 0
    next = ""
    for step in paths[current]:
      if step not in visited:
        # greedy algorithm does not work :(
        value = (remain - paths[current][step] - 1) * graph[step].rate
        if value > max_next:
          max_next = value
          next = step
    visited.add(next)
    remain = remain - paths[current][next] - 1
    output += max_next
    current = next
    print("{} : {} : {} : {}".format(current, remain, visited, output))
  
  