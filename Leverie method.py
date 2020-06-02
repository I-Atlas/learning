import numpy as np


def leverrier(A):
    A = np.array(A)
    n = A.shape[0]
    assert A.shape[1] == n, 'Массив должен быть квадратным'

    a = np.array([1.])
    Ak = np.array(A)
    for k in range(1, n + 1):
        ak = -Ak.trace() / k
        a = np.append(a, ak)
        Ak += np.diag(np.repeat(ak, n))
        Ak = np.dot(A, Ak)
    return a


if __name__ == '__main__':
    A = np.array([[1., 2.], [3., 4.]])
    print()
    leverrier(A)
    A = [[1, 2], [2, -1]]
    print()
    leverrier(A)