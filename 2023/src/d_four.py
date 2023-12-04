def four_a() -> int:
    score = 0
    with open("inputs/d_four.txt") as file:
        for line in file:
            card = line.strip().split(":")
            numbers = card[1].split("|")
            winners = set([int(x) for x in numbers[0].strip().split()])
            has = set([int(x) for x in numbers[1].strip().split()])
            overlap = len(winners.intersection(has)) - 1
            # print(f"{overlap} : {winners} | {has}")
            if overlap >= 0:
                score += 2**overlap
    return score


def four_b() -> int:
    cards = {}
    with open("inputs/d_four.txt") as file:
        for line in file:
            card = line.strip().split(":")
            card_num = int(card[0].split()[1])
            if card_num not in cards:
                cards[card_num] = 0
            cards[card_num] += 1
            numbers = card[1].split("|")
            winners = set([int(x) for x in numbers[0].strip().split()])
            has = set([int(x) for x in numbers[1].strip().split()])
            overlap = len(winners.intersection(has))
            for i in range(1, overlap + 1):
                if card_num + i not in cards:
                    cards[card_num + i] = 0
                cards[card_num + i] += cards[card_num]
    return sum(cards.values())


if __name__ == "__main__":
    print(four_a())
    print(four_b())
