def go_up(i, j, trees):
  top = trees[i][j]
  count = 0
  for x in range(i - 1, -1, -1):
    count += 1
    if trees[x][j] >= top:
      break
  return count


def go_down(i, j, trees):
  top = trees[i][j]
  count = 0
  for x in range(i + 1, len(trees)):
    count += 1
    if trees[x][j] >= top:
      break
  return count


def go_left(i, j, trees):
  top = trees[i][j]
  count = 0
  for y in range(j - 1, -1, -1):
    count += 1
    if trees[i][y] >= top:
      break
  return count

  
def go_right(i, j, trees):
  top = trees[i][j]
  count = 0
  for y in range(j + 1, len(trees[i])):
    count += 1
    if trees[i][y] >= top:
      break
  return count

def calc_score(i, j, trees):
  score = 1
  #up
  score *= go_up(i, j, trees)
  #down
  score *= go_down(i, j, trees)
  #left
  score *= go_left(i, j, trees)
  #right
  score *= go_right(i, j, trees)
  return score
  

with open("input8.txt") as file:
  trees = []
  visible = []
  scores = []
  for line in file:
    trees.append([int(x) for x in line.strip()])
    visible.append([False for x in line.strip()])
    scores.append([0 for x in line.strip()])

  # part 1
  visible[0][0] = True
  visible[0][-1] = True
  visible[-1][0] = True
  visible[-1][-1] = True
  for i in range(1, len(trees) - 1):
    left = trees[i][0]
    right = trees[i][-1]
    visible[i][0] = True
    visible[i][-1] = True
    for j in range(1, len(trees[0]) - 1):
      if trees[i][j] > left:
        visible[i][j] = True
        left = trees[i][j]
      if trees[i][-1 - j] > right:
        visible[i][-1 - j] = True
        right = trees[i][-1 - j]
      if left == 9 and right == 9:
        break
  for j in range(1, len(trees[0]) - 1):
    top = trees[0][j]
    bottom = trees[-1][j]
    visible[0][j] = True
    visible[-1][j] = True
    for i in range(1, len(trees) - 1):
      if trees[i][j] > top:
        visible[i][j] = True
        top = trees[i][j]
      if trees[-1 - i][j] > bottom:
        visible[-1 - i][j] = True
        bottom = trees[-1 - i][j]
      if top == 9 and bottom == 9:
        break
  # print(visible)
  count = sum([sum([1 if x == True else 0 for x in y]) for y in visible])
  print(count)

  ## part 2
  for i in range(1, len(trees) - 1):
    for j in range(1, len(trees[0]) - 1):
      scores[i][j] = calc_score(i, j, trees)

  best = max([max(x) for x in scores])
  print(best)
      
      