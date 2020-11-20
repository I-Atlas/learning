def maximums(n, b):
    a = [None] * n
    a[0] = b[0]
    current_x = max(0, a[0])
    for i in range(1, n):
        a_of_i = b[i] + current_x
        a[i] = a_of_i
        current_x = max(current_x, a_of_i)
    return " ".join(str(a_of_i) for a_of_i in a)


if __name__ == "__main__":
    n = int(input())
    b = list(map(int, input().split(" ")))
    print(maximums(n, b))