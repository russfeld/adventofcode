from collections import deque

with open("input5.txt") as file:
  stacks = []
  for line in file:
    stack = 0
    if line[1] == "1":
      break
    for i in range(1, len(line), 4):
      if len(stacks) <= stack:
        stacks.append(deque())
      if line[i] != ' ':
        stacks[stack].appendleft(line[i])
      stack += 1
      # print(line[i], end="")
    # print()
  file.readline()
  # print(stacks)
  for line in file:
    splits = line.strip().split(" ")
    storage = deque()
    for i in range(0, int(splits[1])):
      letter = stacks[int(splits[3]) - 1].pop()
      storage.appendleft(letter)
    stacks[int(splits[5]) - 1].extend(storage)
    # print(stacks)
  # print(stacks)
  for stack in stacks:
    print(stack[-1])
