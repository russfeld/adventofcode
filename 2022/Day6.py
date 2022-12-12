for line in open("input6.txt"):
  for i in range(14,len(line.strip())):
    if len(set(line[i-14:i])) == 14: print(i)