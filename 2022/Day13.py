import functools

def dprint(string):
  pass

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
  dprint("Compare {} and {}".format(left, right))
  if isinstance(left, int) and isinstance(right, int):
    if left < right:
      dprint("left before right")
      return -1
    elif left > right:
      dprint("right before left")
      return 1
    else:
      dprint("equal")
      return 0
  if isinstance(left, int):
    return compare([left], right)
  if isinstance(right, int):
    return compare(left, [right])
  i = 0
  while i < min(len(left), len(right)):
    next = compare(left[i], right[i])
    if next != 0:
      return next
    i += 1
  if len(left) == len(right):
    dprint("both same size")
    return 0
  if len(left) < len(right):
    dprint("left shorter than right")
    return -1
  else:
    dprint("right shorter than left")
    return 1


with open("input13.txt") as file:
  count = 0
  index = 1
  packets = []
  for line in file:
    left, end = parse(line, 0)
    right, end = parse(file.readline(), 0)
    # discard
    discard = file.readline()
    dprint(left)
    dprint(right)
    packets.append(left)
    packets.append(right)
    if compare(left, right) > 0:
      dprint("out of order")
    else:
      dprint("in order")
      count += index
    index += 1
  print(count)

  first, end = parse("[[2]]", 0)
  second, end = parse("[[6]]", 0)
  packets.append(first)
  packets.append(second)

  ordered = sorted(packets, key=functools.cmp_to_key(compare))

  # for packet in ordered:
  #   print(packet)

  key = (ordered.index(first)+ 1) * (ordered.index(second) + 1)
  print(key)

