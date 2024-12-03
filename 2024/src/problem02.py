total = 0

for line in open("../inputs/02.txt"):
  items = [int(x) for x in line.split()]
  print(items)
  sums = [items[i] - items[i+1] for i in range(len(items)-1)]
  print(sums)
  if all([i > 0 and i <= 3 for i in sums]) or all([i < 0 and i >= -3 for i in sums]):
    total += 1
print(total)