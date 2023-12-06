def five_a() -> int:
    with open("inputs/e_five.txt") as file:
        lines = [line.strip() for line in file]
    seeds = [int(x) for x in lines[0].split(":")[1].split()]
    lines = lines[2:]

    map_key = {}
    maps = {}

    # iterate file until empty
    while len(lines) > 0:
        src, to, dest = lines[0].strip().split()[0].split("-")
        map_key[src] = dest
        maps[src] = []
        lines = lines[1:]
        # iterate map until blank line
        while len(lines[0].strip()) > 0:
            maps[src].append(tuple([int(x) for x in lines[0].strip().split()]))
            lines = lines[1:]
            if len(lines) == 0:
                break
        lines = lines[1:]

    current = "seed"
    while current != "location":
        new_seeds = []
        for seed in seeds:
            new_seeds.append(convert(seed, maps[current]))
        seeds = new_seeds
        current = map_key[current]
        # print(f"{current[:5]} :\t{seeds}")
    return min(seeds)


def convert(seed, maps) -> int:
    for map in maps:
        end, start, length = map
        if seed >= start and seed < start + length:
            return seed - start + end
    return seed


def five_b() -> int:
    with open("inputs/e_five.txt") as file:
        lines = [line.strip() for line in file]
    seed_pairs = [int(x) for x in lines[0].split(":")[1].split()]
    lines = lines[2:]

    map_key = {}
    maps = {}

    # iterate file until empty
    while len(lines) > 0:
        src, to, dest = lines[0].strip().split()[0].split("-")
        map_key[src] = dest
        maps[src] = []
        lines = lines[1:]
        # iterate map until blank line
        while len(lines[0].strip()) > 0:
            new_map = tuple([int(x) for x in lines[0].strip().split()])
            maps[src].append((new_map[1], new_map[0], new_map[2]))
            lines = lines[1:]
            if len(lines) == 0:
                break
        lines = lines[1:]

    for key, value in maps.items():
        value.sort()

    seed_ranges = []
    while len(seed_pairs) > 0:
        seed_ranges.append((seed_pairs[0], seed_pairs[1]))
        seed_pairs = seed_pairs[2:]

    # sort them
    seed_ranges.sort()

    current = "seed"
    while current != "location":
        seed_ranges = convert_ranges(seed_ranges, maps[current])
        seed_ranges.sort()
        current = map_key[current]
        # print(f"{current[:5]} :\t{seed_ranges}")

    return seed_ranges[0][0]


def convert_ranges(seed_ranges, map):
    output_ranges = []
    while len(seed_ranges) > 0 and len(map) > 0:
        seed_start = seed_ranges[0][0]
        seed_length = seed_ranges[0][1]
        map_end = map[0][1]
        map_start = map[0][0]
        map_length = map[0][2]
        # print(f"{seed_start} {seed_length} : {map_start} {map_length} {map_end}")
        if seed_start < map_start:
            # seed begins before map
            if seed_start + seed_length <= map_start:
                # seed start is entirely before map
                # copy seed to output
                output_ranges.append((seed_start, seed_length))
                # seed is done
                seed_ranges = seed_ranges[1:]
            else:
                # seed start before map but ends after map start
                # copy seed to start of map to output
                output_ranges.append((seed_start, map_start - seed_start))
                if seed_start + seed_length > map_start + map_length:
                    # seed runs off end of map
                    # convert entire map and add to output
                    output_ranges.append((map_end, map_length))
                    # map is done
                    map = map[1:]
                    # update seed to end of map
                    # TODO might be off by 1?
                    # TODO This may be faulty
                    seed_ranges[0] = (
                        map_start + map_length,
                        (seed_start + seed_length) - (map_start + map_length),
                    )
                else:
                    # seed ends in map
                    # add portion of seed to output
                    output_ranges.append(
                        (map_end, (seed_start + seed_length) - map_start)
                    )
                    # seed is done
                    seed_ranges = seed_ranges[1:]
        else:
            # seed begins after map
            if seed_start >= map_start + map_length:
                # seed is completely after map
                # map is done
                map = map[1:]
            else:
                # seed begins in map
                if seed_start + seed_length <= map_start + map_length:
                    # seed is entirely in map
                    output_ranges.append(
                        (map_end + (seed_start - map_start), seed_length)
                    )
                    # seed is done
                    seed_ranges = seed_ranges[1:]
                else:
                    # seed ends outside of map
                    # add remaining seed inside map
                    output_ranges.append(
                        (
                            (map_end + (seed_start - map_start)),
                            (map_start + map_length) - seed_start,
                        )
                    )
                    # map is done
                    map = map[1:]
                    # update seed to end of map
                    # TODO might be off by 1?
                    # TODO This may be faulty
                    seed_ranges[0] = (
                        map_start + map_length,
                        (seed_start + seed_length) - (map_start + map_length),
                    )
        # print(output_ranges)
    if len(seed_ranges) > 0:
        for rng in seed_ranges:
            output_ranges.append(rng)
    return output_ranges


if __name__ == "__main__":
    print(five_a())
    print(five_b())

# print(convert_ranges([(0, 10)], [(10, 100, 10)]))
# print(convert_ranges([(5, 10)], [(10, 100, 10)]))
# print(convert_ranges([(10, 10)], [(10, 100, 10)]))
# print(convert_ranges([(15, 10)], [(10, 100, 10), (20, 200, 10)]))
# print(convert_ranges([(20, 10)], [(10, 100, 10), (20, 200, 10)]))
# print(convert_ranges([(5, 15)], [(10, 100, 10)]))
# print(convert_ranges([(10, 15)], [(10, 100, 10), (20, 200, 10)]))
# print(convert_ranges([(5, 20)], [(10, 100, 10), (20, 200, 10)]))
# print(convert_ranges([(12, 6)], [(10, 100, 10)]))
