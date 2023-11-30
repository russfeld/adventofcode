def one_a() -> int:
  with open("inputs/a_one.txt") as file:
    for line in file:
      print(line)
  return 0

def one_b() -> int:
  with open("inputs/a_one.txt") as file:
    for line in file:
      print(line)
  return 0

if __name__ == "__main__":
  print(one_a)
  print(one_b)