def nine_a() -> int:
    data = []
    with open("inputs/i_nine.txt") as file:
        for line in file:
            data.append([int(x) for x in line.strip().split()])
    total = 0
    for report in data:
        current = report
        sum_last = current[-1]
        while not all([x == 0 for x in current]):
            current = [current[i] - current[i - 1] for i in range(1, len(current))]
            sum_last += current[-1]
        total += sum_last
    return total


def nine_b() -> int:
    data = []
    with open("inputs/i_nine.txt") as file:
        for line in file:
            data.append([int(x) for x in line.strip().split()])
    total = 0
    for report in data:
        current = report
        firsts = [current[0]]
        while not all([x == 0 for x in current]):
            current = [current[i] - current[i - 1] for i in range(1, len(current))]
            firsts.append(current[0])
        new_value = 0
        for x in reversed(firsts):
            new_value = -1 * new_value + x
        # print(new_value)
        total += new_value
    return total


if __name__ == "__main__":
    print(nine_a())
    print(nine_b())
