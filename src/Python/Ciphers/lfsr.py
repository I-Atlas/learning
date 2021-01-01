def lfsr(seed, taps):
    sr, xor = seed, 0
    while 1:
        for t in taps:
            xor += int(sr[t - 1])
        if xor % 2 == 0.0:
            xor = 0
        else:
            xor = 1
        print("-------------------------")
        print(f"Исходное состояние: {sr}")
        print(f"b7: {xor}")
        sr, xor = str(xor) + sr[:-1], 0
        print(f"b0: {sr[-1]}")
        print(f"Новое состояние: {sr}")
        print("-------------------------")
        if sr == seed:
            break


if __name__ == '__main__':
    lfsr('11000100', (8, 4, 3, 2))