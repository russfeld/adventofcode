import re


def twelve_a() -> int:
    records = []
    with open("inputs/l_twelve.txt") as file:
        for line in file:
            splits = line.strip().split()
            condition = splits[0]
            groups = [int(x) for x in splits[1].split(",")]
            records.append((condition, groups))

    total = 0
    for record in records:
        pattern = re.compile(build_regex(record[1]))
        count = options(record[0], pattern)
        # print(count)
        total += count

    return total


# ^[\?.]?[\?#]{1}[\?.]+[\?#]{6}[\?.]+[\?#]{5}[\?.]?$


def build_regex(groups):
    pattern = "^[\?.]*"
    for group in groups:
        pattern += "[\?#]{" + str(group) + "}"
        pattern += "[\?.]+"
    pattern = pattern[:-1] + "*$"
    # print(pattern)
    return pattern


def options(record: str, pattern):
    if pattern.match(record) is None:
        # print(record)
        # print("No Match")
        return 0
    else:
        if "?" not in record:
            # print(record)
            # print("Match")
            return 1
        else:
            # recurse
            return options(record.replace("?", ".", 1), pattern) + options(
                record.replace("?", "#", 1), pattern
            )


def twelve_c() -> int:
    records = []
    with open("inputs/l_twelve.txt") as file:
        for line in file:
            splits = line.strip().split()
            condition = (
                splits[0]
                + "?"
                + splits[0]
                + "?"
                + splits[0]
                + "?"
                + splits[0]
                + "?"
                + splits[0]
            )
            while ".." in condition:
                condition = condition.replace("..", ".")
            splits[1] = (
                splits[1]
                + ","
                + splits[1]
                + ","
                + splits[1]
                + ","
                + splits[1]
                + ","
                + splits[1]
            )
            groups = [int(x) for x in splits[1].split(",")]
            records.append((condition, groups))

    total = 0
    for record in records:
        count = matcher(record[0], record[1])
        # print(count)
        total += count

    return total


# https://github.com/clrfl/AdventOfCode2023/blob/master/12/explanation.ipynb
def matcher(springs, groups):
    expected = "."
    for group in groups:
        expected += "#" * group
        expected += "."
    # print(expected)
    # print(springs)
    states = {0: 1}
    for char in springs:
        new_states = {}
        for state in states:
            # consume unknown
            if char == "?":
                # any transition
                if state < len(expected) - 1:
                    # add current states to next state
                    if state + 1 not in new_states:
                        new_states[state + 1] = 0
                    new_states[state + 1] = new_states[state + 1] + states[state]
                if expected[state] == ".":
                    # remain at current state
                    if state not in new_states:
                        new_states[state] = 0
                    new_states[state] = new_states[state] + states[state]

            # consume damaged
            elif char == "#":
                # must take transition
                if state < len(expected) - 1 and expected[state + 1] == "#":
                    # add current states to next state
                    if state + 1 not in new_states:
                        new_states[state + 1] = 0
                    new_states[state + 1] = new_states[state + 1] + states[state]

            # consume spring
            elif char == ".":
                # try to take transition
                if state < len(expected) - 1 and expected[state + 1] == ".":
                    # add current states to next state
                    if state + 1 not in new_states:
                        new_states[state + 1] = 0
                    new_states[state + 1] = new_states[state + 1] + states[state]

                # try to stay
                if expected[state] == ".":
                    # remain at current state
                    if state not in new_states:
                        new_states[state] = 0
                    new_states[state] = new_states[state] + states[state]
        states = new_states
        # print(states)
    return states.get(len(expected) - 1, 0) + states.get(len(expected) - 2, 0)


if __name__ == "__main__":
    print(twelve_a())
    print(twelve_c())
