def monitor(position, cycle):
  if abs(position - cycle) <= 1:
    print("#", end="")
  else:
    print(".", end="")
  if (cycle + 1) % 40 == 0:
    print()
    cycle = -1
  cycle += 1
  return cycle


with open("input10.txt") as file:

  # part 1
  # cycle = 0
  # register = 1
  # stop = 20
  # output = 0
  # for line in file:

  #   toadd = 0
  #   if line.startswith("noop"):
  #     cycle += 1
  #   elif line.startswith("addx"):
  #     ops = line.strip().split(" ")
  #     cycle += 2
  #     toadd = int(ops[1])
  #   if cycle >= stop:
  #     print(register * stop)
  #     output += register * stop
  #     stop += 40
  #   register += toadd
  # print(output)

  # part 2
  position = 1
  cycle = 0
  for line in file:
    if line.startswith("noop"):
      cycle = monitor(position, cycle)
    elif line.startswith("addx"):
      ops = line.strip().split(" ")
      cycle = monitor(position, cycle)
      cycle = monitor(position, cycle)
      position += int(ops[1])
    
    
      