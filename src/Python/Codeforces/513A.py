def solve(n1, n2, k1, k2):
    if n1 > n2:
        return "First"
    else:
        return "Second"


if __name__ == "__main__":
    n1, n2, k1, k2 = map(int, input().split(" "))
    print(solve(n1, n2, k1, k2))
