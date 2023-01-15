import math

class Item:

  def __init__(self, val):
    self.val = val
  
  def __str__(self):
    return str(self.val)

  def __repr__(self):
    return str(self)


with open("input20.txt") as file:
  items = [Item(int(x)) for x in file]

# manual attempt 1
# output = [x for x in items]

# print(len(output))
# #print(output)
# zero = None
# for x in items:
#   index = output.index(x)
#   val = x.val
#   if val == 0:
#     zero = x
#   while val != 0:
#     if val > 0:
#       if index == len(output) - 2:
#         temp = output.pop(index)
#         output.insert(0, temp)
#         index = 0
#       elif index == len(output) - 1:
#         temp = output.pop(index)
#         output.insert(1, temp)
#         index = 1
#       else:
#         temp = output[index]
#         output[index] = output[index + 1]
#         output[index + 1] = temp
#         index += 1
#       val -= 1
#     elif val < 0:
#       if index == 1:
#         temp = output.pop(index)
#         output.append(temp)
#         index = len(output) - 1
#       elif index == 0:
#         temp = output.pop(index)
#         output.insert(len(output) - 1, temp)
#         index = len(output) - 2
#       else:
#         temp = output[index]
#         output[index] = output[index - 1]
#         output[index - 1] = temp
#         index -= 1
#       val += 1
#   print(output)


zero = None
test = [x for x in items]
for x in items:
  index = test.index(x)
  val = x.val
  if val == 0:
    zero = x
  arounds = math.trunc(x.val / (len(items) - 1))
  # print(arounds)
  new_index = ((index + x.val + arounds) % (len(items))) 
  if x.val > 0:
    new_index += 1
  if x.val != 0 and new_index == 0:
    new_index = len(items)
  elif x.val != 0 and new_index == len(items):
    new_index = 0
  # print("Move {} from {} to {}".format(x.val, index, new_index))
  test.insert(new_index, x)
  if new_index < index:
    index += 1
  test.pop(index)
  # print(test)

# verify
# for i in range(len(output)):
#   if output[i].val != test[i].val:
#     print("Error!")

index = test.index(zero)
print("{}".format(test[(index + 1000) % len(test)].val + test[(index + 2000) % len(test)].val + test[(index + 3000) % len(test)].val))

zero = None
test = [x for x in items]

# add decryption key
for x in items:
  x.val = x.val * 811589153

# do 10 times
for i in range(0, 10):
  for x in items:
    index = test.index(x)
    val = x.val
    if val == 0:
      zero = x
    arounds = math.trunc(x.val / (len(items) - 1))
    # print(arounds)
    new_index = ((index + x.val + arounds) % (len(items))) 
    if x.val > 0:
      new_index += 1
    if x.val != 0 and new_index == 0:
      new_index = len(items)
    elif x.val != 0 and new_index == len(items):
      new_index = 0
    # print("Move {} from {} to {}".format(x.val, index, new_index))
    test.insert(new_index, x)
    if new_index < index:
      index += 1
    test.pop(index)
    # print(test)

index = test.index(zero)
print("{}".format(test[(index + 1000) % len(test)].val + test[(index + 2000) % len(test)].val + test[(index + 3000) % len(test)].val))
