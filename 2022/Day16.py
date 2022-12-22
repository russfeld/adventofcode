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


def heuristic_search(paths, current, remain, output, visited, size, graph):
  if len(visited) == size:
    return output
  next = {}
  for step in paths[current]:
    if step not in visited and (remain - paths[current][step] - 1) > 0:
      value = (remain - paths[current][step] - 1) * graph[step].rate
      next[step] = value
  if len(next) == 0:
    return output
  ordered = sorted(next, key=next.get, reverse=True)
  result = 0
  for step in ordered:
    visited.add(step)
    # if len(visited) < 3:
    #   print("{} : {}".format(visited, output + next[step]))
    result = max(result, heuristic_search(paths, step, remain - paths[current][step] - 1, output + next[step], visited, size, graph))
    visited.remove(step)
  return result

def super_heuristic_search(paths, you, you_remain, ele, ele_remain, output, visited, size, graph):
  """
  Not even sure I could explain this one if I tried
  Basically tries to calculate next best step for you and elephant
  and tries all possible combinations of them
  It is kinda a "branch and bound" problem?
  """
  if len(visited) == size:
    return output
  you_next = {}
  for step in paths[you]:
    if step not in visited and (you_remain - paths[you][step] - 1) > 0:
      value = (you_remain - paths[you][step] - 1) * graph[step].rate
      you_next[step] = value
  ele_next = {}
  for step in paths[ele]:
    if step not in visited and (ele_remain - paths[ele][step] - 1) > 0:
      value = (ele_remain - paths[ele][step] - 1) * graph[step].rate
      ele_next[step] = value
  if len(you_next) + len(ele_next) == 0:
    return output
  result = 0
  for you_step in you_next:
    visited.add(you_step)
    for ele_step in ele_next:
      if ele_step == you_step:
        continue
      visited.add(ele_step)
      result = max(result, super_heuristic_search(paths, you_step, (you_remain - paths[you][you_step] - 1), ele_step, (ele_remain - paths[ele][ele_step] - 1), output + you_next[you_step] + ele_next[ele_step], visited, size, graph))
      visited.remove(ele_step)
    visited.remove(you_step)
  return result

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




with open("input16.txt") as file:
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

  # let's try a heuristic approach
  # ok, this ended up not being a heuristic but whatever
  # this problem is fun?
  output = heuristic_search(paths, "AA", 30, 0, set(), len(valves), graph)
  print(output)

  # Part 2 - WTF? Elephants?
  output = super_heuristic_search(paths, "AA", 26, "AA", 26, 0, set(), len(valves), graph)
  print(output)
  
  
  