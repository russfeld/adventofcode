def two_a() -> int:
    sum = 0
    with open("inputs/b_two.txt") as file:
        for line in file:
            splits = line.strip().split(":")
            game_info = splits[0].split(" ")
            game_number = int(game_info[1])
            games = splits[1].split(";")
            ok = True
            for game in games:
                items = game.split(",")
                for item in items:
                    item = item.strip().split(" ")
                    if item[1] == "blue" and int(item[0]) > 14:
                        ok = False
                        break
                    elif item[1] == "green" and int(item[0]) > 13:
                        ok = False
                        break
                    elif item[1] == "red" and int(item[0]) > 12:
                        ok = False
                        break
                if not ok:
                    break
            if ok:
                sum += game_number
    return sum


def two_b() -> int:
    sum = 0
    with open("inputs/b_two.txt") as file:
        for line in file:
            splits = line.strip().split(":")
            game_info = splits[0].split(" ")
            game_number = int(game_info[1])
            games = splits[1].split(";")
            mins = [-1, -1, -1]
            for game in games:
                items = game.split(",")
                for item in items:
                    item = item.strip().split(" ")
                    if item[1] == "blue" and (mins[0] < int(item[0]) or mins[0] == -1):
                        mins[0] = int(item[0])
                    elif item[1] == "green" and (
                        mins[1] < int(item[0]) or mins[1] == -1
                    ):
                        mins[1] = int(item[0])
                    elif item[1] == "red" and (mins[2] < int(item[0]) or mins[2] == -1):
                        mins[2] = int(item[0])
            sum += mins[0] * mins[1] * mins[2]
    return sum


if __name__ == "__main__":
    print(two_a())
    print(two_b())
