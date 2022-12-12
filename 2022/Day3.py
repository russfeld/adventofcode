import string

with open("input3.txt") as file:
  score = 0
  lines = [line.strip() for line in file]
  for i in range(0, len(lines), 3):
    for char in lines[i]:
      if char in lines[i+1] and char in lines[i+2]:
        # print(char)
        if char in string.ascii_lowercase: 
          # print(string.ascii_lowercase.index(char) + 1)
          score += string.ascii_lowercase.index(char) + 1
        else:
          # print(string.ascii_uppercase.index(char) + 27)
          score += string.ascii_uppercase.index(char) + 27
        break
  print(score)