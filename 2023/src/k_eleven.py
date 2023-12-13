import itertools


def eleven_a() -> int:
    galaxies = set()
    with open("inputs/k_eleven.txt") as file:
        i = 0
        for line in file:
            j = 0
            for char in line.strip():
                if char == "#":
                    galaxies.add((i, j))
                j += 1
            i += 1
        cols = len(line.strip())
        rows = i

    empty_rows = set()
    for i in range(rows):
        if not any([galaxy[0] == i for galaxy in galaxies]):
            empty_rows.add(i)

    empty_cols = set()
    for j in range(cols):
        if not any([galaxy[1] == j for galaxy in galaxies]):
            empty_cols.add(j)

    galaxies = sorted(galaxies)
    # print(galaxies)
    # print(empty_rows)
    # print(empty_cols)

    total = 0
    for one, two in list(itertools.combinations(galaxies, 2)):
        distance = dist(one, two, empty_rows, empty_cols)
        # print(f"{one} {two} {distance}")
        total += distance

    return total


def dist(one, two, empty_rows, empty_cols) -> int:
    distance = abs(one[0] - two[0]) + abs(one[1] - two[1])
    # print(f"initial dist {one} {two} {distance}")
    distance += blanks(one[0], two[0], empty_rows)
    distance += blanks(one[1], two[1], empty_cols)
    # print(f"final dist {one} {two} {distance}")
    return distance


def blanks(a, b, empties) -> int:
    if a < b:
        return sum([x in empties for x in range(a, b + 1)])
    else:
        return sum([x in empties for x in range(b, a + 1)])


def eleven_b() -> int:
    galaxies = set()
    with open("inputs/k_eleven.txt") as file:
        i = 0
        for line in file:
            j = 0
            for char in line.strip():
                if char == "#":
                    galaxies.add((i, j))
                j += 1
            i += 1
        cols = len(line.strip())
        rows = i

    empty_rows = set()
    for i in range(rows):
        if not any([galaxy[0] == i for galaxy in galaxies]):
            empty_rows.add(i)

    empty_cols = set()
    for j in range(cols):
        if not any([galaxy[1] == j for galaxy in galaxies]):
            empty_cols.add(j)

    galaxies = sorted(galaxies)
    # print(galaxies)
    # print(empty_rows)
    # print(empty_cols)

    total = 0
    for one, two in list(itertools.combinations(galaxies, 2)):
        distance = dist2(one, two, empty_rows, empty_cols)
        # print(f"{one} {two} {distance}")
        total += distance

    return total


def dist2(one, two, empty_rows, empty_cols) -> int:
    distance = abs(one[0] - two[0]) + abs(one[1] - two[1])
    # print(f"initial dist {one} {two} {distance}")
    distance += blanks(one[0], two[0], empty_rows) * 999999
    distance += blanks(one[1], two[1], empty_cols) * 999999
    # print(f"final dist {one} {two} {distance}")
    return distance


if __name__ == "__main__":
    print(eleven_a())
    print(eleven_b())
