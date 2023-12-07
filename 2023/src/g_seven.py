import functools
from collections import Counter


def seven_a() -> int:
    hands = []
    with open("inputs/g_seven.txt") as file:
        for line in file:
            line = line.strip().split()
            hands.append((line[0], int(line[1])))
    hands = sorted(hands, key=functools.cmp_to_key(compare))
    score = 0
    # print(hands)
    for i in range(len(hands)):
        score += hands[i][1] * (i + 1)
    return score


def compare(x, y):
    type_x = type(x[0])
    type_y = type(y[0])
    if type_x == type_y:
        return stronger(x[0], y[0])
    return type_x - type_y


def type(x):
    counts = Counter(x)
    if 5 in counts:
        return 6
    elif 4 in counts:
        return 5
    elif 3 in counts and 2 in counts:
        return 4
    elif 3 in counts:
        return 3
    elif Counter(counts)[2] == 2:
        return 2
    elif 2 in counts:
        return 1
    else:
        return 0


value = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 11,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
}


def stronger(x, y):
    for i in range(len(x)):
        value_x = value[x[i]]
        value_y = value[y[i]]
        if value_x != value_y:
            return value_x - value_y
    print("This should not happen")
    return 0


def seven_b() -> int:
    hands = []
    with open("inputs/g_seven.txt") as file:
        for line in file:
            line = line.strip().split()
            hands.append((line[0], int(line[1])))
    hands = sorted(hands, key=functools.cmp_to_key(compare2))
    score = 0
    # print(hands)
    for i in range(len(hands)):
        score += hands[i][1] * (i + 1)
    return score


def compare2(x, y):
    type_x = type2(x[0])
    type_y = type2(y[0])
    if type_x == type_y:
        return stronger2(x[0], y[0])
    return type_x - type_y


value2 = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 1,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
}


def stronger2(x, y):
    for i in range(len(x)):
        value_x = value2[x[i]]
        value_y = value2[y[i]]
        if value_x != value_y:
            return value_x - value_y
    print("This should not happen")
    return 0


def type2(x):
    counts = Counter(x)

    # Add Jokers to card with highest count
    if "J" in counts:
        jokers = counts["J"]
        # of course there is a case where they are all jokers
        if jokers == 5:
            return 6
        del counts["J"]
        key = max(counts, key=counts.get)
        counts[key] += jokers

    counts = counts.values()

    if 5 in counts:
        return 6
    elif 4 in counts:
        return 5
    elif 3 in counts and 2 in counts:
        return 4
    elif 3 in counts:
        return 3
    elif Counter(counts)[2] == 2:
        return 2
    elif 2 in counts:
        return 1
    else:
        return 0


if __name__ == "__main__":
    print(seven_a())
    print(seven_b())
