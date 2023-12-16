def thirteen_a() -> int:
    pattern = []
    columns = []
    score = 0
    with open("inputs/m_thirteen.txt") as file:
        for line in file:
            if len(line.strip()) == 0:
                mirror = [pattern[0]]
                pattern = pattern[1:]
                for i in range(1, len(pattern) + 1):
                    if match(mirror, pattern):
                        # print(f"row {i}")
                        score += 100 * i
                        break
                    mirror = [pattern[0]] + mirror
                    pattern = pattern[1:]
                pattern = []
                mirror = [columns[0]]
                columns = columns[1:]
                for i in range(1, len(columns) + 1):
                    if match(mirror, columns):
                        # print(f"col {i}")
                        score += i
                        break
                    mirror = [columns[0]] + mirror
                    columns = columns[1:]
                columns = []
            else:
                if len(columns) == 0:
                    columns = [""] * len(line.strip())
                for i in range(len(line.strip())):
                    columns[i] += line[i]
                pattern.append(line.strip())

        mirror = [pattern[0]]
        pattern = pattern[1:]
        for i in range(1, len(pattern) + 1):
            if match(mirror, pattern):
                score += 100 * i
                break
            mirror = [pattern[0]] + mirror
            pattern = pattern[1:]
        mirror = [columns[0]]
        columns = columns[1:]
        for i in range(1, len(columns) + 1):
            if match(mirror, columns):
                score += i
                break
            mirror = [columns[0]] + mirror
            columns = columns[1:]
    return score


def match(mirror, pattern):
    # print("\n".join(mirror))
    # print()
    # print("\n".join(pattern))
    for i in range(min(len(mirror), len(pattern))):
        if mirror[i] != pattern[i]:
            return False
    return True


def thirteen_b() -> int:
    pattern = []
    columns = []
    score = 0
    with open("inputs/m_thirteen.txt") as file:
        for line in file:
            if len(line.strip()) == 0:
                mirror = [pattern[0]]
                pattern = pattern[1:]
                for i in range(1, len(pattern) + 1):
                    if match2(mirror, pattern):
                        # print(f"row {i}")
                        score += 100 * i
                        break
                    mirror = [pattern[0]] + mirror
                    pattern = pattern[1:]
                pattern = []
                mirror = [columns[0]]
                columns = columns[1:]
                for i in range(1, len(columns) + 1):
                    if match2(mirror, columns):
                        # print(f"col {i}")
                        score += i
                        break
                    mirror = [columns[0]] + mirror
                    columns = columns[1:]
                columns = []
            else:
                if len(columns) == 0:
                    columns = [""] * len(line.strip())
                for i in range(len(line.strip())):
                    columns[i] += line[i]
                pattern.append(line.strip())

        mirror = [pattern[0]]
        pattern = pattern[1:]
        for i in range(1, len(pattern) + 1):
            if match2(mirror, pattern):
                score += 100 * i
                break
            mirror = [pattern[0]] + mirror
            pattern = pattern[1:]
        mirror = [columns[0]]
        columns = columns[1:]
        for i in range(1, len(columns) + 1):
            if match2(mirror, columns):
                score += i
                break
            mirror = [columns[0]] + mirror
            columns = columns[1:]
    return score


def match2(mirror, pattern):
    diff = 0
    for i in range(min(len(mirror), len(pattern))):
        if mirror[i] != pattern[i]:
            # https://stackoverflow.com/questions/28423448/counting-differences-between-two-strings
            diff += sum(1 for a, b in zip(mirror[i], pattern[i]) if a != b)
            if diff > 1:
                return False
    return diff == 1


if __name__ == "__main__":
    print(thirteen_a())
    print(thirteen_b())
