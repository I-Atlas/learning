def solve(text):
    text.sort()

    stolen = 0

    for i in range(1, len(text)):

        if text[i] - text[i - 1] > 1:
            stolen += text[i] - text[i - 1] - 1

    return stolen


if __name__ == "__main__":
    n = int(input())
    text = list(map(int, input().split(" ")))
    print(solve(text))
