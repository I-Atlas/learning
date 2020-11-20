if __name__ == "__main__":

    text = int(input())

    value = 0
    for _ in range(0, text):
        operation = input()

        if "+" in operation:
            value += 1
        else:
            value -= 1

    print(value)
