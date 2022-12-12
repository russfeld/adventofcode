with open("input4.txt") as file:
  count = 0
  for line in file:
    splits = line.strip().split(",")
    first = splits[0].split("-")
    second = splits[1].split("-")
    first = [int(x) for x in first]
    second = [int(x) for x in second]
    if (first[0] <= second[0] and second[0] <= first[1]) or (second[0] <= first[0] and first[0] <= second[1]):
         count += 1
  print(count)