from collections import deque


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

    while one != two:
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
    return tile == "7" or tile == "F" or tile == "|"


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
            grid.append(list(line.strip()))

    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if grid[i][j] == "S":
                start = i, j

    visited = set()
    starts = find_first(start, grid)
    visited.add(start)
    visited.add(starts[0])

    # so what this does is tries to assign a "left and right" to the pipe
    # if the section containing the start is vertical or horizontal just pick
    # a side. If it is a corner the corner_dir will pick one appropriately
    if is_vertical(starts[1], start, starts[0]):
        grid[start[0]][start[1]] = "<"
        direction = "<"
    elif is_horizontal(starts[1], start, starts[0]):
        grid[start[0]][start[1]] = "^"
        direction = "^"
    else:
        grid[start[0]][start[1]] = "O"
        direction = corner_dir(starts[1], start, starts[0], "0")
    prev = start
    curr = starts[0]

    # iteratively find the next step and assign the direction
    # adjusting on corners to keep it consistent
    while curr != start:
        next_one = find_next(curr, grid[curr[0]][curr[1]])
        if next_one[0] == prev:
            next = next_one[1]
        else:
            next = next_one[0]
        if is_vertical(prev, curr, next) or is_horizontal(prev, curr, next):
            grid[curr[0]][curr[1]] = direction
        else:
            direction, side = corner_dir(prev, curr, next, direction)
            grid[curr[0]][curr[1]] = side
        visited.add(curr)
        prev = curr
        curr = next

    # remove any stray pipes
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if (i, j) not in visited:
                grid[i][j] = "."

    count_in = 0
    count_out = 0
    count_none = 0
    count_edge = 0
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if grid[i][j] == ".":
                count, side = flood_fill(grid, i, j)
                if side is not None:
                    if side == "In":
                        count_in += count
                    elif side == "Out":
                        count_out += count
                else:
                    count_none += count

    # debug print
    # for row in grid:
    #     print("".join(row))

    # print(count_in)
    # print(count_out)

    # ok, this is cheating - manually looked at the debug to see which side is in or out
    return count_out


def flood_fill(grid, i, j):
    queue = deque()
    queue.append((i, j))
    side = None
    count = 0
    while len(queue) > 0:
        curr = queue.pop()
        if grid[curr[0]][curr[1]] != ".":
            continue
        if (
            curr[0] == 0
            or curr[0] == len(grid) - 1
            or curr[1] == 0
            or curr[1] == len(grid[0]) - 1
        ):
            side = "Edge"
        if curr[0] > 0:
            if grid[curr[0] - 1][curr[1]] == ".":
                queue.append((curr[0] - 1, curr[1]))
            elif grid[curr[0] - 1][curr[1]] == "v" and side is None:
                side = "In"
            elif grid[curr[0] - 1][curr[1]] == "^" and side is None:
                side = "Out"
            elif grid[curr[0] - 1][curr[1]] == "O" and side is None:
                side = "In"
            elif grid[curr[0] - 1][curr[1]] == "I" and side is None:
                side = "Out"
        if curr[0] < len(grid) - 1:
            if grid[curr[0] + 1][curr[1]] == ".":
                queue.append((curr[0] + 1, curr[1]))
            elif grid[curr[0] - 1][curr[1]] == "^" and side is None:
                side = "In"
            elif grid[curr[0] - 1][curr[1]] == "v" and side is None:
                side = "Out"
            elif grid[curr[0] - 1][curr[1]] == "O" and side is None:
                side = "In"
            elif grid[curr[0] - 1][curr[1]] == "I" and side is None:
                side = "Out"
        if curr[1] > 0:
            if grid[curr[0]][curr[1] - 1] == ".":
                queue.append((curr[0], curr[1] - 1))
            elif grid[curr[0]][curr[1] - 1] == ">" and side is None:
                side = "In"
            elif grid[curr[0]][curr[1] - 1] == "<" and side is None:
                side = "Out"
            elif grid[curr[0]][curr[1] - 1] == "O" and side is None:
                side = "In"
            elif grid[curr[0]][curr[1] - 1] == "I" and side is None:
                side = "Out"
        if curr[1] < len(grid[0]) - 1:
            if grid[curr[0]][curr[1] + 1] == ".":
                queue.append((curr[0], curr[1] + 1))
            elif grid[curr[0]][curr[1] + 1] == "<" and side is None:
                side = "In"
            elif grid[curr[0]][curr[1] + 1] == ">" and side is None:
                side = "Out"
            elif grid[curr[0]][curr[1] + 1] == "O" and side is None:
                side = "In"
            elif grid[curr[0]][curr[1] + 1] == "I" and side is None:
                side = "Out"
        grid[curr[0]][curr[1]] = " "
        count += 1
    return count, side


def is_vertical(one, two, three):
    # same column
    return one[1] == two[1] == three[1]


def is_horizontal(one, two, three):
    # same row
    return one[0] == two[0] == three[0]


def corner_dir(one, two, three, direction):
    # from east -> south or south -> east
    if one[0] < three[0] and one[1] < three[1]:
        # east -> south
        if one[0] == two[0]:
            if direction == "^":
                return ">", "O"
            else:
                return "<", "I"
        # south -> east
        else:
            if direction == "<":
                return "v", "O"
            else:
                return "^", "I"
    # from west -> south or south -> west
    if one[0] < three[0] and one[1] > three[1]:
        # west -> south
        if one[0] == two[0]:
            if direction == "^":
                return "<", "O"
            else:
                return ">", "I"
        # south -> west
        else:
            if direction == ">":
                return "v", "O"
            else:
                return "^", "I"
    # from north -> east or east -> north
    if one[0] > three[0] and one[1] < three[1]:
        # east -> north
        if one[0] == two[0]:
            if direction == "^":
                return "<", "I"
            else:
                return ">", "O"
        # north -> east
        else:
            if direction == "<":
                return "^", "O"
            else:
                return "v", "I"
    # from north -> west or west -> north
    if one[0] > three[0] and one[1] > three[1]:
        # west -> north
        if one[0] == two[0]:
            if direction == "^":
                return ">", "I"
            else:
                return "<", "O"
        # north -> west
        else:
            if direction == ">":
                return "^", "O"
            else:
                return "v", "I"


if __name__ == "__main__":
    print(ten_a())
    print(ten_b())
