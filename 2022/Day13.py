def parse(string, start):
  if string[start] == "[":
    # print("open 1")
    current = []
    start += 1
    while start < len(string):
      if string[start] == "[":
        # print("open 2")
        next, start = parse(string, start)
        # print(next)
        current.append(next)
      elif string[start].isdigit():
        # print("digit", end="")
        end = start + 1
        while string[end].isdigit():
          end += 1
        current.append(int(string[start:end]))
        # print(current)
        start = end
      elif string[start] == ",":
        start += 1
      elif string[start] == "]":
        # print("break")
        break
    return current, start + 1
  print("error")


def compare(left, right):
  if isinstance(left[0], int) and isinstance(right[0], int)


with open("test13.txt") as file:
  for line in file:
    left, end = parse(line, 0)
    right, end = parse(file.readline(), 0)
    # discard
    discard = file.readline()
    print(left)
    print(right)
    
    count = 0
    if compare(left, right):
      count += 1
    print(count)

