grid = []
path = ""
max_len = -1
matches = {}

with open("input22.txt") as file:
  for line in file:
    if len(line.strip()) == 0:
      break
    row = [-1]
    for char in line:
      if char == " ":
        row.append(-1)
      elif char == ".":
        row.append(0)
      elif char == "#":
        row.append(1)
    row.append(-1)
    if max_len < 0:
      max_len = len(row)
      blank_row = [-1 for x in range(len(row))]
      grid.append(blank_row)
    while len(row) < max_len:
      row.append(-1)
    grid.append(row)
  grid.append(blank_row)
  path = file.readline()

row = 1
col = 1
dir = 0
while grid[row][col] != 0:
  col += 1

start_row = row
start_col = col

# print("Start: {} {}".format(row, col))
for i in grid:
  for j in i:
    if j == -1:
      print("_", end="")
    elif j == 0:
      print(".", end="")
    elif j == 1:
      print("#", end="")
  print()
# print(path)

steps = []
next = ""
for char in path:
  if char.isdigit():
    next += char
  else:
    steps.append(int(next))
    next = ""
    steps.append(char)
steps.append(int(next))
# print(steps)

# part 1
for step in steps:
  if isinstance(step, int):
    if dir == 0:
      # moving east, increase col
      while step > 0:
        check = (col + 1) % len(grid[row])
        while grid[row][check] == -1:
          check = (check + 1) % len(grid[row])
        if grid[row][check] == 0:
          # normal space
          col = check
          step -= 1
        elif grid[row][check] == 1:
          # wall
          step = 0
    elif dir == 1:
      # moving south, increase row
      while step > 0:
        check = (row + 1) % len(grid)
        while grid[check][col] == -1:
          check = (check + 1) % len(grid)
        if grid[check][col] == 0:
          # normal space
          row = check
          step -= 1
        elif grid[check][col] == 1:
          # wall
          step = 0
    elif dir == 2:
      # moving west, decrease col
      while step > 0:
        check = (col - 1) % len(grid[row])
        while grid[row][check] == -1:
          check = (check - 1) % len(grid[row])
        if grid[row][check] == 0:
          # normal space
          col = check
          step -= 1
        elif grid[row][check] == 1:
          # wall
          step = 0
    elif dir == 3:
      # moving north, decrease row
      while step > 0:
        check = (row - 1) % len(grid)
        while grid[check][col] == -1:
          check = (check - 1) % len(grid)
        if grid[check][col] == 0:
          # normal space
          row = check
          step -= 1
        elif grid[check][col] == 1:
          # wall
          step = 0
  else:
    if step == "R":
      dir = (dir + 1) % 4
    elif step == "L":
      dir = (dir - 1) % 4

print("Part 1 {}".format((1000 * (row)) + (4 * (col)) + dir))

# Part 2
if len(grid) < len(grid[0]):
  dim = len(grid) // 3
else:
  dim = len(grid[0]) // 3

print("Dimension: {}".format(dim))

def is_inner_corner(i, j):
  count = 0
  corner = -1
  if grid[i-1][j] != -1 and grid[i+1][j] != -1 and grid[i][j-1] != -1 and grid[i][j+1] != -1:
    if grid[i-1][j-1] == -1:
      count += 1
      corner = 0
    if grid[i-1][j+1] == -1:
      count += 1
      corner = 1
    if grid[i+1][j-1] == -1:
      count +=1
      corner = 2
    if grid[i+1][j+1] == -1:
      count += 1
      corner = 3
    if count == 1:
      return corner
    else:
      return -1
  else:
    return -1

def is_outer_corner(i, j):
  if i >= len(grid) - 1 or j >= len(grid[0]) - 1:
    return -1
  if i <= 0 or j <= 0:
    return -1
  count = 0
  corner = -1
  if grid[i-1][j-1] == -1:
    count += 1
  else:
    corner = 0
  if grid[i-1][j+1] == -1:
    count += 1
  else:
    corner = 1
  if grid[i+1][j-1] == -1:
    count +=1
  else:
    corner = 2
  if grid[i+1][j+1] == -1:
    count += 1
  else:
    corner = 3
  if count == 3:
    return corner
  else:
    return -1

def match_sides(dim, i1, j1, d1, dir1, i2, j2, d2, dir2):
  for x in range(dim):
    i1 += d1[0]
    j1 += d1[1]
    i2 += d2[0]
    j2 += d2[1]
    square1 = (i1, j1, (dir1 + 2) % 4)
    match1 = (i2, j2, dir2)
    # print("Match {} to {}".format(square1, match1))
    matches[square1] = match1
    square2 = (i2, j2, (dir2 + 2) % 4)
    match2 = (i1, j1, dir1)
    # print("Match {} to {}".format(square2, match2))
    matches[square2] = match2

def swap_corner(corner1, d1):
  if corner1 == 0:
    # top left corner
    # going south:
    if d1 == (1, 0):
      d1 = (0, -1)
      dir1 = 3
    else:
      d1 = (-1, 0)
      dir1 = 2
  elif corner1 == 1:
    # top right corner
    # going south:
    if d1 == (1, 0):
      d1 = (0, 1)
      dir1 = 3
    else:
      d1 = (-1, 0)
      dir1 = 0
  elif corner1 == 2:
    # bottom left corner:
    # going north:
    if d1 == (-1, 0):
      d1 = (0, -1)
      dir1 = 1
    else:
      d1 = (1, 0)
      dir1 = 2
  elif corner1 == 3:
    # bottom right corner
    # going north:
    if d1 == (-1, 0):
      d1 = (0, 1)
      dir1 = 1
    else:
      d1 = (1, 0)
      dir1 = 0
  return d1, dir1


# need to find corners
for i in range(1, len(grid) - 1):
  for j in range(1, len(grid[0]) - 1):
    corner = is_inner_corner(i, j)
    if corner == -1:
      continue
    print("Found inner corner at {} {}".format(i, j))
    if corner == 0:
      # top left corner
      # delta = we are moving north
      d1 = (-1, 0)
      # direction = entering here we go east
      dir1 = 0
      # delta = we are moving west
      d2 = (0, -1)
      # direction = entering here we go down
      dir2 = 1
    elif corner == 1:
      # top right corner
      # delta = we are moving north
      d1 = (-1, 0)
      # direction = entering here we go west
      dir1 = 2
      # delta = we are moving east
      d2 = (0, 1)
      # direction = entering here we go down
      dir2 = 1
    elif corner == 2:
      # bottom left corner
      # delta = we are moving south
      d1 = (1, 0)
      # direction = entering here we go east
      dir1 = 0
      # delta = we are moving west
      d2 = (0, -1)
      # direction = entering here we go up
      dir2 = 3
    elif corner == 3:
      # bottom right corner
      # delta = we are moving south
      d1 = (1, 0)
      # direction = entering here we go west
      dir1 = 2
      # delta = we are moving east
      d2 = (0, 1)
      # direction = entering here we go up
      dir2 = 3
    print("ms {} {} {} {} {} {} {} {} {}".format(dim, i, j, d1, dir1, i, j, d2, dir2))
    match_sides(dim, i, j, d1, dir1, i, j, d2, dir2)
    i1 = i + (d1[0] * (dim))
    j1 = j + (d1[1] * (dim))
    i2 = i + (d2[0] * (dim))
    j2 = j + (d2[1] * (dim))
    corner1 = is_outer_corner(i1, j1)
    corner2 = is_outer_corner(i2, j2)
    while (corner1 == -1 and corner2 != -1) or (corner1 != -1 and corner2 == -1):
      if corner1 >= 0:
        print("Found outer corner 1 at {} {}".format(i1, j1))
        d1, dir1 = swap_corner(corner1, d1)
        i1 = i1 - d1[0]
        j1 = j1 - d1[1]
      elif corner2 >= 0:
        print("Found outer corner 2 at {} {}".format(i2, j2))
        d2, dir2 = swap_corner(corner2, d2)
        i2 = i2 - d2[0]
        j2 = j2 - d2[1]
      print("ms {} {} {} {} {} {} {} {} {}".format(dim, i1, j1, d1, dir1, i2, j2, d2, dir2))
      match_sides(dim, i1, j1, d1, dir1, i2, j2, d2, dir2)
      i1 = i1 + (d1[0] * dim)
      j1 = j1 + (d1[1] * dim)
      i2 = i2 + (d2[0] * dim)
      j2 = j2 + (d2[1] * dim)
      corner1 = is_outer_corner(i1, j1)
      corner2 = is_outer_corner(i2, j2)
      
# for key, value in matches.items():
#   print("{}: {}".format(key, value))
# print(len(matches))

row = start_row
col = start_col
dir = 0

# part 2 movement
for step in steps:
  if isinstance(step, int):
    while step > 0:
      check_d = dir
      if dir == 0:
        # moving east, increase col
        check_r = row
        check_c = (col + 1)
      elif dir == 1:
        # moving south, increase row
        check_r = (row + 1)
        check_c = col
      elif dir == 2:
        # moving west, decrease col
        check_r = row
        check_c = (col - 1)
      elif dir == 3:
        # moving north, decrease row
        check_r = (row - 1)
        check_c = col
      if grid[check_r][check_c] == -1:
        lookup = (row, col, check_d)
        if lookup in matches:
          check_r, check_c, check_d = matches[lookup]
        else:
          print("Can't find match for {}".format(lookup))
          raise Exception
      if grid[check_r][check_c] == 0:
        # normal space
        row = check_r
        col = check_c
        dir = check_d
        step -= 1
      elif grid[check_r][check_c] == 1:
        # wall
        step = 0
  else:
    if step == "R":
      dir = (dir + 1) % 4
    elif step == "L":
      dir = (dir - 1) % 4
print("{} {} {}".format(row, col, dir))
print("Part 2 {}".format((1000 * (row)) + (4 * (col)) + dir))