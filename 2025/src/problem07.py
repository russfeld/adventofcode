def problem07b(inputfile):
  input = open(inputfile).readlines()
  lines = { input[0].index("S"): 1 }
  length = len(input)
  for i in range(1, length):
    new_lines = {}
    for line in lines:
      loc = line
      count = lines[loc]
      if input[i][loc] == "^":
        if loc - 1 in new_lines:
          new_lines[loc - 1] += count
        else:
          new_lines[loc - 1] = count
        if loc + 1 in new_lines:
          new_lines[loc + 1] += count
        else:
          new_lines[loc + 1] = count
      else:
        if loc in new_lines:
          new_lines[loc] += count
        else:
          new_lines[loc] = count
    lines = new_lines
    # print(lines)
  return sum(lines.values())


if __name__ == "__main__":
  # print(problem07b("inputs/07e.txt"))
  print(problem07b("inputs/07.txt"))
