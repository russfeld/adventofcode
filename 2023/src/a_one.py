def one_a() -> int:
    sum: int = 0
    with open("inputs/a_one.txt") as file:
        for line in file:
            line = [x for x in line if x.isdigit()]
            value = int(line[0] + line[-1])
            sum += value
    return sum


numbers = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
}


def one_b() -> int:
    sum: int = 0
    with open("inputs/a_one.txt") as file:
        for line in file:
            line = line.strip()
            vals = []
            while len(vals) == 0:
                for number, digit in numbers.items():
                    if line.startswith(number):
                        vals.append(digit)
                        break
                if line[0].isdigit():
                    vals.append(line[0])
                line = line[1:]
            while len(vals) == 1 and len(line) > 0:
                for number, digit in numbers.items():
                    if line.endswith(number):
                        vals.append(digit)
                        break
                if line[-1].isdigit():
                    vals.append(line[-1])
                line = line[:-1]
            # print(vals)
            value = int(vals[0] + vals[-1])
            # print(value)
            sum += value
    return sum


if __name__ == "__main__":
    print(one_a())
    print(one_b())
