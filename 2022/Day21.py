from sympy.solvers import solve
from sympy import Symbol

nodes = {}

class Node:

  def __init__(self, val, left=None, op=None, right=None):
    self.val = val
    self.left = left
    self.op = op
    self.right = right

  def __str__(self):
    if self.left is not None:
      return "{} {} {} = {}".format(self.left, self.op, self.right, self.val)
    else:
      return "{}".format(self.val)
    
  def __repr__(self):
    return str(self)


def dfs(name):
  node = nodes[name]
  if node.left is not None:
    val1 = dfs(node.left)
    val2 = dfs(node.right)
    if node.op == "+":
      result = val1 + val2
    elif node.op == "-":
      result = val1 - val2
    elif node.op == "*":
      result = val1 * val2
    elif node.op == "/":
      result = val1 / val2
    return result
  else:
    return node.val

with open("input21.txt") as file:
  for line in file:
    splits = line.split(":")
    name = splits[0]
    if splits[1].strip().isdigit():
      value = int(splits[1].strip())
      node = Node(value)
    else:
      math = splits[1].strip().split(" ")
      node = Node(0, math[0], math[1], math[2])
    nodes[name] = node
print(dfs("root"))

x = Symbol('x')
nodes["root"].op = "-"
nodes["humn"].val = x

print(dfs("root"))
print(solve(dfs("root"), x))



    
