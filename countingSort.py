import numpy as np

MAX = 20
A = list(np.random.randint(MAX, size=16))
B = A.copy()
C = []

for i in range(MAX+1):
    C.append(0)

for j in range(len(A)):
    C[A[j]] += 1

for m in range(1, MAX+1):
    C[m] += C[m-1]

for n in reversed(range(len(A))):
    B[C[A[n]]-1] = A[n]
    C[A[n]] -= 1

print('Unsorted list:', A)
print('Sorted list:', B)

if __name__ == "__main__":
    main()