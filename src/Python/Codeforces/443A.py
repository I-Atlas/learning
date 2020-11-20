def solve(text):
    text = text[1:-1]
    if text == '':
        return 0
    chars = text.split(", ")
    return len(set(chars))


if __name__ == "__main__":
    text = input()
    print(solve(text))
