elves = set()


with open("input23.txt") as file:
  row = 0
  for line in file:
    col = 0
    for char in line.strip():
      if char == "#":
        elves.add((row, col))
      col += 1
    row += 1

def find_mins():
  min_row = -1
  max_row = -1
  min_col = -1
  max_col = -1
  for elf in elves:
    row, col = elf
    if min_row == -1:
      min_row = row
      max_row = row
      min_col = col
      max_col = col
    if row > max_row:
      max_row = row
    if col > max_col:
      max_col = col
    if col < min_col:
      min_col = col
    if row < min_row:
      min_row = row
  return (min_row, max_row + 1, min_col, max_col + 1)

def print_board():
  mins = find_mins()
  for i in range(mins[0], mins[1]):
    for j in range(mins[2], mins[3]):
      if (i, j) in elves:
        print("#", end="")
      else:
        print(".", end="")
    print()
  print()

print_board()

def can_move_north(elf):
  one = (elf[0]-1, elf[1]-1)
  two = (elf[0]-1, elf[1])
  three = (elf[0]-1, elf[1]+1)
  return one not in elves and two not in elves and three not in elves

def can_move_south(elf):
  one = (elf[0]+1, elf[1]-1)
  two = (elf[0]+1, elf[1])
  three = (elf[0]+1, elf[1]+1)
  return one not in elves and two not in elves and three not in elves

def can_move_west(elf):
  one = (elf[0]-1, elf[1]-1)
  two = (elf[0], elf[1]-1)
  three = (elf[0]+1, elf[1]-1)
  return one not in elves and two not in elves and three not in elves

def can_move_east(elf):
  one = (elf[0]-1, elf[1]+1)
  two = (elf[0], elf[1]+1)
  three = (elf[0]+1, elf[1]+1)
  return one not in elves and two not in elves and three not in elves

def has_neighbor(elf):
  one = (elf[0]-1, elf[1]-1)
  two = (elf[0]-1, elf[1])
  three = (elf[0]-1, elf[1]+1)
  four = (elf[0]+1, elf[1]-1)
  five = (elf[0]+1, elf[1])
  six = (elf[0]+1, elf[1]+1)
  seven = (elf[0], elf[1]+1)
  eight = (elf[0], elf[1]-1)
  return one in elves or two in elves or three in elves or four in elves or five in elves or six in elves or seven in elves or eight in elves

def make_move(elves, dir):
  # propose
  propose = {}
  match = set()
  stay = set()
  for elf in elves:
    # print("{} proposes ".format(elf), end="")
    proposed = False
    if has_neighbor(elf):
      for d in range(dir, dir + 4):
        d = d % 4
        if d == 0:
          # north
          if can_move_north(elf):
            new = (elf[0]-1, elf[1])
            proposed = True
        elif d == 1:
          # south
          if can_move_south(elf):
            new = (elf[0]+1, elf[1])
            proposed = True
        elif d == 2:
          # west
          if can_move_west(elf):
            new = (elf[0], elf[1]-1)
            proposed = True
        elif d == 3:
          # east
          if can_move_east(elf):
            new = (elf[0], elf[1]+1)
            proposed = True
        if proposed:
          # print("{} ".format(new), end="")
          if new in propose:
            # print("conflict")
            match.add(new)
            stay.add(elf)
            stay.add(propose[new])
          else:
            propose[new] = elf
            # print()
          break
    if not proposed:
      # print("no move")
      stay.add(elf)
  # move
  for new in propose:
    if new not in match:
      stay.add(new)
  return stay
  # print_board()

dir = 0
for i in range(10):
  new = make_move(elves, dir)
  elves = new
  dir = (dir + 1) % 4


print_board()
mins = find_mins()
#print(mins)
squares = (mins[1] - mins[0]) * (mins[3] - mins[2])
#print(squares)
print(squares - len(elves))

rounds = 10
while True:
  new = make_move(elves, dir)
  if rounds == 21:
    print(sorted(elves))
    print(sorted(new))
  if elves == new:
    break
  elves = new
  rounds += 1
  dir = (dir + 1) % 4

print(rounds + 1)