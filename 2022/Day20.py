class Item:

  def __init__(self, val):
    self.val = val
  
  def __str__(self):
    return str(self.val)

  def __repr__(self):
    return str(self)


with open("input20.txt") as file:
  items = [Item(int(x)) for x in file]

output = [x for x in items]

print(len(output))
#print(output)
zero = None
for x in items:
  index = output.index(x)
  val = x.val
  if val == 0:
    zero = x
  while val != 0:
    if val > 0:
      if index == len(output) - 2:
        temp = output.pop(index)
        output.insert(0, temp)
        index = 0
      elif index == len(output) - 1:
        temp = output.pop(index)
        output.insert(1, temp)
        index = 1
      else:
        temp = output[index]
        output[index] = output[index + 1]
        output[index + 1] = temp
        index += 1
      val -= 1
    elif val < 0:
      if index == 1:
        temp = output.pop(index)
        output.append(temp)
        index = len(output) - 1
      elif index == 0:
        temp = output.pop(index)
        output.insert(len(output) - 1, temp)
        index = len(output) - 2
      else:
        temp = output[index]
        output[index] = output[index - 1]
        output[index - 1] = temp
        index -= 1
      val += 1
  #print(output)


index = output.index(zero)
print("{}".format(output[(index + 1000) % len(output)].val + output[(index + 2000) % len(output)].val + output[(index + 3000) % len(output)].val))
