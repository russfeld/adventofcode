numbers = []
values = {
  "2": 2,
  "1": 1,
  "0": 0,
  "-": -1,
  "=": -2
}

digits = {
  2: "2",
  1: "1",
  0: "0",
  -1: "-",
  -2: "="
}

with open("input25.txt") as file:
  for line in file:
    numbers.append(line.strip())

def snafu_to_decimal(number):
  value = 0
  for char in number:
    value = value * 5 + values[char]
  return value

def decimal_to_snafu(value):
  output = ""
  while value > 0:
    digit = ((value + 2) % 5) - 2
    output = digits[digit] + output
    value = (value + 2) // 5
  return output


sum = 0
for number in numbers:
  # print("{}\t".format(number), end="")
  value = snafu_to_decimal(number)
  # print("{}\t".format(value), end="")
  # new = decimal_to_snafu(value)
  # print("{}".format(new))
  sum += value
print(sum)
print(decimal_to_snafu(sum))