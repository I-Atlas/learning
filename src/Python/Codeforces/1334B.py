def middle_class(n, x, input_array):
    input_array.sort()
    current_sum = total_rich = 0
    for i in range(n-1, -1, -1):
        current_sum += input_array[i]
        current_avg = float(current_sum) / float(n - i)
        if current_avg >= x:
            total_rich += 1
        else:
            break
    return total_rich


if __name__ == "__main__":
    t = int(input())
    results = list()
    for i in range(0, t):
        n, x = map(int, input().split(" "))
        input_array = list(map(int, input().split(" ")))
        results.append(middle_class(n, x, input_array))
    for result in results:
        print(result)