def three_a() -> int:
    schematic = []
    with open("inputs/c_three.txt") as file:
        for line in file:
            schematic.append(line.strip())
    sum = 0
    for i, row in enumerate(schematic):
        num = ""
        include = False
        for j, char in enumerate(row):
            if char.isdigit():
                num += char
                if not include:
                    include = check_adjacent(schematic, i, j)
            else:
                if include:
                    sum += int(num)
                    include = False
                num = ""
        if include:
            sum += int(num)
            include = False
    return sum


def check_adjacent(schematic, i, j) -> bool:
    if i > 0 and j > 0 and is_symbol(schematic[i - 1][j - 1]):
        return True
    if i > 0 and is_symbol(schematic[i - 1][j]):
        return True
    if i > 0 and j < len(schematic[0]) - 1 and is_symbol(schematic[i - 1][j + 1]):
        return True
    if j > 0 and is_symbol(schematic[i][j - 1]):
        return True
    if j < len(schematic[0]) - 1 and is_symbol(schematic[i][j + 1]):
        return True
    if i < len(schematic) - 1 and j > 0 and is_symbol(schematic[i + 1][j - 1]):
        return True
    if i < len(schematic) - 1 and is_symbol(schematic[i + 1][j]):
        return True
    if (
        i < len(schematic) - 1
        and j < len(schematic[0]) - 1
        and is_symbol(schematic[i + 1][j + 1])
    ):
        return True


def is_symbol(char) -> bool:
    if char.isdigit():
        return False
    if char == ".":
        return False
    return True


def three_b() -> int:
    schematic = []
    with open("inputs/c_three.txt") as file:
        for line in file:
            schematic.append(line.strip())
    sum = 0
    gears = {}
    for i, row in enumerate(schematic):
        num = ""
        include = None
        for j, char in enumerate(row):
            if char.isdigit():
                num += char
                if include is None:
                    include = check_adjacent_2(schematic, i, j)
                    # print(f"{i},{j}: {include}")
            else:
                if include is not None:
                    if include in gears:
                        gears[include].append(num)
                    else:
                        # print(include)
                        gears[include] = [num]
                num = ""
                include = None
        if include is not None:
            if include in gears:
                # print(include)
                gears[include].append(num)
            else:
                gears[include] = [num]
    # print(gears)
    for location, values in gears.items():
        # print(location)
        if len(values) == 2:
            product = int(values[0]) * int(values[1])
            sum += product
    return sum


def check_adjacent_2(schematic, i, j):
    if i > 0 and j > 0 and is_symbol_2(schematic[i - 1][j - 1]):
        return (i - 1, j - 1)
    if i > 0 and is_symbol_2(schematic[i - 1][j]):
        return (i - 1, j)
    if i > 0 and j < len(schematic[0]) - 1 and is_symbol_2(schematic[i - 1][j + 1]):
        return (i - 1, j + 1)
    if j > 0 and is_symbol_2(schematic[i][j - 1]):
        return (i, j - 1)
    if j < len(schematic[0]) - 1 and is_symbol_2(schematic[i][j + 1]):
        return (i, j + 1)
    if i < len(schematic) - 1 and j > 0 and is_symbol_2(schematic[i + 1][j - 1]):
        return (i + 1, j - 1)
    if i < len(schematic) - 1 and is_symbol_2(schematic[i + 1][j]):
        return (i + 1, j)
    if (
        i < len(schematic) - 1
        and j < len(schematic[0]) - 1
        and is_symbol_2(schematic[i + 1][j + 1])
    ):
        return (i + 1, j + 1)
    return None


def is_symbol_2(char) -> bool:
    if char == "*":
        return True
    return False


if __name__ == "__main__":
    print(three_a())
    print(three_b())
