import math


def six_a() -> int:
    with open("inputs/f_six.txt") as file:
        lines = [line.strip() for line in file]
        times = [int(x) for x in lines[0].split()[1:]]
        distances = [int(x) for x in lines[1].split()[1:]]

    product = 1
    for i in range(len(times)):
        time = times[i]
        distance = distances[i]

        # solved using math
        # x * (time - x) < distance
        # x * time - x^2 < distance
        # x^2 - x * time + distance > 0
        # time +- sqrt(time^2 - 4 * distance) / 2

        # print(f"{time} : {distance}")
        small = (time - math.sqrt(time**2 - (4 * distance))) / 2
        if math.ceil(small) != small:
            small = math.ceil(small)
        else:
            small = int(small) + 1
        large = (time + math.sqrt(time**2 - (4 * distance))) / 2
        if math.floor(large) != large:
            large = math.floor(large)
        else:
            large = int(large) - 1
        # print(f"{small} : {large}")
        wins = large - small + 1
        product *= wins
        # print(wins)

    return product


def six_b() -> int:
    with open("inputs/f_six.txt") as file:
        lines = [line.strip() for line in file]
        time = int("".join(lines[0].split()[1:]))
        distance = int("".join(lines[1].split()[1:]))

    # solved using math
    # x * (time - x) < distance
    # x * time - x^2 < distance
    # x^2 - x * time + distance > 0
    # time +- sqrt(time^2 - 4 * distance) / 2

    # print(f"{time} : {distance}")
    small = (time - math.sqrt(time**2 - (4 * distance))) / 2
    if math.ceil(small) != small:
        small = math.ceil(small)
    else:
        small = int(small) + 1
    large = (time + math.sqrt(time**2 - (4 * distance))) / 2
    if math.floor(large) != large:
        large = math.floor(large)
    else:
        large = int(large) - 1
    # print(f"{small} : {large}")
    wins = large - small + 1

    return wins


if __name__ == "__main__":
    print(six_a())
    print(six_b())
