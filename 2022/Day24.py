canes = {}
start = None
end = None
rows = 0
cols = 0

with open("input24.txt") as file:
  row = 0
  for line in file:
    col = 0
    if cols == 0:
      cols = len(line.strip())
    for char in line.strip():
      if char in ">v<^" and (row, col) not in canes:
        canes[(row, col)] = []
      if char == ">":
        canes[(row, col)].append((0, 1))
      elif char == "v":
        canes[(row, col)].append((1, 0))
      elif char == "<":
        canes[(row, col)].append((0, -1))
      elif char == "^":
        canes[(row, col)].append((-1, 0))
      elif char == ".":
        if start == None:
          start = (row, col)
        end = (row, col)  # will be last one found
      col += 1
    row += 1
  rows = row


def print_board(canes, player, start, end, rows, cols):
  for i in range(rows):
    for j in range(cols):
      current = (i, j)
      if current == player:
        print("E", end="")
      elif current == start:
        print("s", end="")
      elif current == end:
        print("e", end="")
      elif i == 0 or i == rows - 1 or j == 0 or j == cols - 1:
        print("#", end="")
      elif current in canes:
        if len(canes[current]) > 1:
          print("{}".format(len(canes[current])), end="")
        elif canes[current][0] == (0, 1):
          print(">", end="")
        elif canes[current][0] == (1, 0):
          print("v", end="")
        elif canes[current][0] == (0, -1):
          print("<", end="")
        elif canes[current][0] == (-1, 0):
          print("^", end="")
      else:
        print(".", end="")
    print()
  print()

def simulate_tick(canes, rows, cols):
  output = {}
  for location, items in canes.items():
    for item in items:
      new_row = location[0] + item[0]
      new_col = location[1] + item[1]
      if new_row == 0:
        new_row = rows - 2
      elif new_row == rows - 1:
        new_row = 1
      if new_col == 0:
        new_col = cols - 2
      elif new_col == cols - 1:
        new_col = 1
      new = (new_row, new_col)
      # print("Storm at {} moving {} to {}".format(location, item, new))
      if new not in output:
        output[new] = [item]
      else:
        output[new].append(item)
  return output

def check_location(row, col, rows, cols, canes, start, end):
  # print("Checking {} {}".format(row, col))
  if (row, col) == start:
    return True
  if (row, col) == end:
    return True
  if row <= 0 or row >= rows - 1 or col <= 0 or col >= cols - 1:
    return False
  if (row, col) in canes:
    return False
  return True

# print_board(canes, start, start, end, rows, cols)
# canes = simulate_tick(canes, rows, cols)

queue = set()
queue.add(start)
steps = 0
while end not in queue:
  # print(queue)
  canes = simulate_tick(canes, rows, cols)
  # print_board(canes, start, start, end, rows, cols)
  steps += 1
  new_queue = set()
  for loc in queue:
    row = loc[0]
    col = loc[1]
    # check current
    if check_location(row, col, rows, cols, canes, start, end):
      # print("OK current")
      new_queue.add(loc)
    # check up
    if check_location(row-1, col, rows, cols, canes, start, end):
      # print("OK up")
      new_queue.add((row-1, col))
    # check down
    if check_location(row+1, col, rows, cols, canes, start, end):
      # print("OK down")
      new_queue.add((row+1, col))
    # check left
    if check_location(row, col-1, rows, cols, canes, start, end):
      # print("OK left")
      new_queue.add((row, col-1))
    # check right
    if check_location(row, col+1, rows, cols, canes, start, end):
      # print("OK right")
      new_queue.add((row, col+1))
  queue = new_queue
print(steps)

queue = [end]

while start not in queue:
  # print(queue)
  canes = simulate_tick(canes, rows, cols)
  # print_board(canes, start, start, end, rows, cols)
  steps += 1
  new_queue = set()
  for loc in queue:
    row = loc[0]
    col = loc[1]
    # check current
    if check_location(row, col, rows, cols, canes, start, end):
      # print("OK current")
      new_queue.add(loc)
    # check up
    if check_location(row-1, col, rows, cols, canes, start, end):
      # print("OK up")
      new_queue.add((row-1, col))
    # check down
    if check_location(row+1, col, rows, cols, canes, start, end):
      # print("OK down")
      new_queue.add((row+1, col))
    # check left
    if check_location(row, col-1, rows, cols, canes, start, end):
      # print("OK left")
      new_queue.add((row, col-1))
    # check right
    if check_location(row, col+1, rows, cols, canes, start, end):
      # print("OK right")
      new_queue.add((row, col+1))
  queue = new_queue
print(steps)

queue = [start]

while end not in queue:
  # print(queue)
  canes = simulate_tick(canes, rows, cols)
  # print_board(canes, start, start, end, rows, cols)
  steps += 1
  new_queue = set()
  for loc in queue:
    row = loc[0]
    col = loc[1]
    # check current
    if check_location(row, col, rows, cols, canes, start, end):
      # print("OK current")
      new_queue.add(loc)
    # check up
    if check_location(row-1, col, rows, cols, canes, start, end):
      # print("OK up")
      new_queue.add((row-1, col))
    # check down
    if check_location(row+1, col, rows, cols, canes, start, end):
      # print("OK down")
      new_queue.add((row+1, col))
    # check left
    if check_location(row, col-1, rows, cols, canes, start, end):
      # print("OK left")
      new_queue.add((row, col-1))
    # check right
    if check_location(row, col+1, rows, cols, canes, start, end):
      # print("OK right")
      new_queue.add((row, col+1))
  queue = new_queue
print(steps)