from collections import deque


rock1 = [[1, 1, 1, 1]]
rock2 = [[0, 1, 0], [1, 1, 1], [0, 1, 0]]
rock3 = [[1, 1, 1], [0, 0, 1], [0, 0, 1]]
rock4 = [[1], [1], [1], [1]]
rock5 = [[1, 1], [1, 1]]
rocks = [rock1, rock2, rock3, rock4, rock5]

jets = deque()
cave = [[1, 1, 1, 1, 1, 1, 1]]
states = {}

def is_empty_row(line):
  for item in line:
    if item == 1:
      return False
  return True


def extend_cave(cave, rock):
  count_open = 0
  start = len(cave)
  for line in reversed(cave):
    if is_empty_row(line):
      count_open += 1
      start -= 1
    else:
      break
  while count_open < (3 + len(rock)):
    cave.append([0, 0, 0, 0, 0, 0, 0])
    count_open += 1
  return cave, start + 3


def check_overlap(cave, rock, top, left):
  if left < 0:
    return False
  if left + len(rock[0]) > 7:
    return False
  for i in range(len(rock)):
    for j in range(len(rock[i])):
      if rock[i][j] == 1 and cave[top + i][left + j] == 1:
        return False
  return True


def shift_rock(cave, rock, jet, top, left):
  if jet == "<" and check_overlap(cave, rock, top, left - 1):
    return left - 1
  elif jet == ">" and check_overlap(cave, rock, top, left + 1):
    return left + 1
  return left


def place_rock(cave, rock, top, left, symbol=1):
  for i in range(len(rock)):
    for j in range(len(rock[i])):
      if rock[i][j] == 1:
        cave[top + i][left + j] = symbol


def remove_rock(cave, rock, top, left):
  for i in range(len(rock)):
    for j in range(len(rock[i])):
      if rock[i][j] == 1:
        cave[top + i][left + j] = 0


def down_rock(cave, rock, top, left):
  if check_overlap(cave, rock, top - 1, left):
    return top - 1, False
  place_rock(cave, rock, top, left)
  return top, True


def drop_rock(cave, rock, jets, jet_index, top, left):
  # handle jet
  left = shift_rock(cave, rock, jets[0], top, left)
  jets.rotate(-1)
  jet_index = (jet_index + 1) % len(jets)
  # handle drop
  top, stop = down_rock(cave, rock, top, left)
  return cave, rock, jets, jet_index, top, left, stop


def pretty_print(cave):
  for line in reversed(cave[1:]):
    for item in line:
      if item == 0:
        print(".", end="")
      elif item == 1:
        print("#", end="")
      elif item == 2:
        print("@", end="")
    print()
  print()


def pretty_print_rock(cave, rock, top, left):
  place_rock(cave, rock, top, left, symbol=2)
  pretty_print(cave)
  remove_rock(cave, rock, top, left)


def calculate_height(cave):
  count = len(cave) - 1
  while is_empty_row(cave[count]):
    count -= 1
  return count


def top_to_int(cave, height):
  output = 0
  for i in range(height, height - 5, -1):
    for j in range(0, 7):
      output = (output << 1) + cave[i][j]
  return output


with open("input17.txt") as file:
  for line in file:
    jets.extend([x for x in line.strip()])

avg_value = 0
# for i in range(2022):
i = 0
target = 1000000000000
jet_index = 0
looped = False
while i < target:
  rock = rocks[i % 5]
  cave, top = extend_cave(cave, rock)
  left = 2
  # pretty_print_rock(cave, rock, top, left)
  while True:
    cave, rock, jets, jet_index, top, left, stop = drop_rock(cave, rock, jets, jet_index, top, left)
    if stop:
      break
  height = calculate_height(cave)
  top = top_to_int(cave, height)
  state = (top, i % 5, jet_index)
  if not looped and state in states:
    looped = True
    print("Loop found at {} : {} : {}".format(state, (height, i), states[state]))
    height_diff = height - states[state][0] 
    i_diff = i - states[state][1]
    loops = (target - states[state][1]) // i_diff
    remain = target - (states[state][1] + loops * i_diff)
    add_height = (loops - 1) * height_diff
    print("{} : {} : {} : {} : {} ".format(height_diff, i_diff, loops, remain, add_height))
    i = target - remain
  else:
    states[state] = (height, i)
  i += 1

total_height = calculate_height(cave) + add_height
print(total_height)
  