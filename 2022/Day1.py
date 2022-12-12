with open("input1.txt") as file:
  elves = []
  total = 0
  for line in file:
    if len(line.strip()) == 0:
      elves.append(total)
      total = 0
    else:
      total += int(line)
  print(max(elves))
  elves.sort()
  print(elves)
  print(elves[-3:])
  print(sum(elves[-3:]))
