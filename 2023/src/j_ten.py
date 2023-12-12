def ten_a() -> int:
    grid = []
    with open("inputs/j_ten.txt") as file:
        for line in file:
            grid.append(line.strip())

    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if grid[i][j] == "S":
                start = i, j

    visited = set()
    starts = find_first(start, grid)
    visited.add(start)
    visited.add(starts[0])
    visited.add(starts[1])
    one = starts[0]
    two = starts[1]

    while(one != two):
        next_one = find_next(one, grid[one[0]][one[1]])
        if next_one[0] not in visited:
            one = next_one[0]
        else:
            one = next_one[1]
        next_two = find_next(two, grid[two[0]][two[1]])
        if next_two[0] not in visited:
            two = next_two[0]
        else:
            two = next_two[1]
        visited.add(one)
        visited.add(two)

    return len(visited) // 2


def find_first(start, grid):
    i, j = start
    output = []
    if i > 0 and south(grid[i - 1][j]):
        output.append((i - 1, j))
    if j > 0 and east(grid[i][j - 1]):
        output.append((i, j - 1))
    if i < len(grid) - 1 and north(grid[i + 1][j]):
        output.append((i + 1, j))
    if j < len(grid[0]) - 1 and west(grid[i][j + 1]):
        output.append((i, j + 1))
    if len(output) == 2:
        return output
    else:
        print("Error in find first!")
        print(start)
        print(output)
        return None

def find_next(location, tile):
    i, j = location
    if tile == "|":
        return [(i - 1, j), (i + 1, j)]
    if tile == "-":
        return [(i, j - 1), (i, j + 1)]
    if tile == "L":
        return [(i - 1, j), (i, j + 1)]
    if tile == "J":
        return [(i - 1, j), (i, j - 1)]
    if tile == "7":
        return [(i + 1, j), (i, j - 1)]
    if tile == "F":
        return [(i + 1, j), (i, j + 1)]
    print(location)
    print(tile)
    print("Error in find next!")
    return None

def south(tile):
    return tile == "7" or tile =="F" or tile == "|"


def north(tile):
    return tile == "L" or tile == "J" or tile == "|"


def east(tile):
    return tile == "-" or tile == "F" or tile == "L"


def west(tile):
    return tile == "-" or tile == "J" or tile == "7"


def ten_b() -> int:
    grid = []
    with open("inputs/j_ten.txt") as file:
        for line in file:
            grid.append(line.strip())

    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if grid[i][j] == "S":
                start = i, j

    visited = set()
    starts = find_first(start, grid)
    if 
    visited.add(start)
    visited.add(starts[0])
    visited.add(starts[1])
    one = starts[0]
    two = starts[1]

    while(one != two):
        next_one = find_next(one, grid[one[0]][one[1]])
        if next_one[0] not in visited:
            one = next_one[0]
        else:
            one = next_one[1]
        next_two = find_next(two, grid[two[0]][two[1]])
        if next_two[0] not in visited:
            two = next_two[0]
        else:
            two = next_two[1]
        visited.add(one)
        visited.add(two)



if __name__ == "__main__":
    print(ten_a())
    print(ten_b())
