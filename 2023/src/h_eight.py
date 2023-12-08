import re, math


def eight_a() -> int:
    steps = ""
    nodes = {}
    pattern = re.compile(r"(...) = \((...), (...)\)")
    with open("inputs/h_eight.txt") as file:
        for line in file:
            if steps == "":
                steps = line.strip()
            elif len(line.strip()) == 0:
                continue
            else:
                matches = re.findall(pattern, line.strip())[0]
                nodes[matches[0]] = (matches[1], matches[2])
    current = "AAA"
    count = 0
    while current != "ZZZ":
        if steps[0] == "L":
            current = nodes[current][0]
        else:
            current = nodes[current][1]
        steps = steps[1:] + steps[0]
        count += 1
    return count


def eight_b() -> int:
    steps = ""
    nodes = {}
    pattern = re.compile(r"(...) = \((...), (...)\)")
    with open("inputs/h_eight.txt") as file:
        for line in file:
            if steps == "":
                steps = line.strip()
            elif len(line.strip()) == 0:
                continue
            else:
                matches = re.findall(pattern, line.strip())[0]
                nodes[matches[0]] = (matches[1], matches[2])
    counts = []
    for node in nodes.keys():
        if node.endswith("A"):
            current = node
            count = 0
            while not current.endswith("Z"):
                if steps[0] == "L":
                    current = nodes[current][0]
                else:
                    current = nodes[current][1]
                steps = steps[1:] + steps[0]
                count += 1
            counts.append(count)
    # print(counts)
    # this is a total hack but it works :D
    # it assumes the paths are unique and don't have multiple end points
    return math.lcm(*counts)


if __name__ == "__main__":
    print(eight_a())
    print(eight_b())
