with open("input2.txt") as file:
  total = 0
  # scores = {"X": 1, "Y": 2, "Z": 3}
  outcomes = {
    "A X": 3, 
    "A Y": 4, 
    "A Z": 8, 
    "B X": 1, 
    "B Y": 5, 
    "B Z": 9, 
    "C X": 2, 
    "C Y": 6, 
    "C Z": 7}
  for line in file:
    score = outcomes[line.strip()]
    print(score)
    total = total + score
  print(total)