from collections import deque

def update(value, operation):
  splits = operation.split(" ")
  try:
    second = int(splits[2])
  except:
    second = value
  if splits[1] == "+":
    return value + second
  elif splits[1] == "*":
    return value * second
  

with open("input11.txt") as file:
  monkeys = []
  items = {}
  operations = {}
  test = {}
  throws = {}
  inspects = {}
  total_test = 1
  for line in file:
    parts = line.strip().split(" ")
    monkey = parts[1][:-1]
    monkeys.append(monkey)
    items[monkey] = deque()
    operations[monkey] = ""
    throws[monkey] = []
    inspects[monkey] = 0
    # print(monkey)
    
    # starting items
    line = file.readline().strip()
    parts = line.split(":")
    start = parts[1].split(",")
    items[monkey].extend([int(x.strip()) for x in start])
    # print(items[monkey])

    # operation
    line = file.readline().strip()
    parts = line.split(":")
    equation = parts[1].split("=")
    operations[monkey] = equation[1].strip()
    # print(operations[monkey])

    # test
    line = file.readline().strip()
    parts = line.split(" ")
    test[monkey] = int(parts[3])
    # use this value to keep things in check for part 2
    # could technically use GCM but product is good enough
    total_test *= int(parts[3])
    # print(test[monkey])

    # if true
    line = file.readline().strip()
    parts = line.split(" ")
    if_true = parts[5]

    # if false
    line = file.readline().strip()
    parts = line.split(" ")
    if_false = parts[5]
    throws[monkey] = (if_true, if_false)
    # print(throws[monkey])

    # blank line
    line = file.readline()

  print(total_test)
  
  for round in range(0, 10000):
    for monkey in monkeys:
      for i in range(len(items[monkey])):
        item = items[monkey].popleft()
        inspects[monkey] += 1
        # print("{} looking at item of value {} ".format(monkey, item), end="")
        item = update(item, operations[monkey])
        # part 1
        # divide worry by 3
        # item = item // 3
        # part 2 
        # mod by gcm of all test values to maintain same outputs
        item = item % total_test
        # print("now {}, testing divide by {} ".format(item, test[monkey]), end="")
        if item % test[monkey] == 0:
          # print("true, throw to {}".format(throws[monkey][0]))
          items[throws[monkey][0]].append(item)
        else:
          # print("false, throw to {}".format(throws[monkey][1]))
          items[throws[monkey][1]].append(item)
    if round in [0, 19, 999, 1999, 2999, 3999, 4999, 5999, 6999, 7999, 8999, 9999]:
      print(round)
      print(inspects)
  # print(inspects)
  values = list(inspects.values())
  values.sort(reverse=True)
  print(values)
  print(values[0] * values[1])