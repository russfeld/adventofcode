def move_head(head, move):
  if move == "R":
    return head[0] + 1, head[1]
  elif move == "L":
    return head[0] - 1, head[1]
  elif move == "U":
    return head[0], head[1] + 1
  elif move == "D":
    return head[0], head[1] - 1
  else:
    print("Error unknown move: " + move)


def move_tail(head, tail):
  if abs(head[0] - tail[0]) <= 1 and abs(head[1] - tail[1]) <= 1:
    # still touching
    return tail
  if head[0] == tail[0] or head[1] == tail[1]:
    # move along row or column
    if tail[0] - 2 == head[0]:
      return tail[0] - 1, head[1]
    elif tail[0] + 2 == head[0]:
      return tail[0] + 1, head[1]
    elif tail[1] - 2 == head[1]:
      return head[0], tail[1] - 1
    elif tail[1] + 2 == head[1]:
      return head[0], tail[1] + 1
    else:
      print("Error linear move: " + str(head) + str(tail))
  elif abs(head[0] - tail[0]) <= 2 and abs(head[1] - tail[1]) <= 2:
    # move diagonal
    if head[0] > tail[0]:
      tail = tail[0] + 1, tail[1]
    else:
      tail = tail[0] - 1, tail[1]
    if head[1] > tail[1]:
      tail = tail[0], tail[1] + 1
    else:
      tail = tail[0], tail[1] - 1
    return tail
  else:
    print("Error unknown tail: " + str(head) + str(tail))
    return tail


with open("input9.txt") as file:
  head = (0, 0)
  tail = (0, 0)
  knots = [(0, 0)] * 10
  seen = set()
  seen9 = set()
  seen.add(tail)
  seen9.add(knots[9])
  for line in file:
    moves = line.strip().split(" ")
    for i in range(0, int(moves[1])):
      # part 1
      head = move_head(head, moves[0])
      tail = move_tail(head, tail)
      seen.add(tail)

      # part 2
      knots[0] = move_head(knots[0], moves[0])
      for i in range(1, 10):
        knots[i] = move_tail(knots[i-1], knots[i])
      seen9.add(knots[9])
    # print(tail)
  print(len(seen))
  print(len(seen9))