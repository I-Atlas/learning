def floyd_warshall(graph):
    predecessors = graph

    distances = len(graph)

    for k in range(distances):
        for i in range(distances):
            for j in range(distances):
                predecessors[i][j] = min(predecessors[i][j], predecessors[i][k] + predecessors[k][j])

    print("Following matrix shows the shortest distances between every pair of vertices: ")
    for node in predecessors:
        print("")
        for item in node:
            print("%s\t" % item, end="")


if __name__ == '__main__':
    INF = float("inf")

    graph = [[0, 5, INF, 10],
             [INF, 0, 3, INF],
             [INF, INF, 0, 1],
             [INF, INF, INF, 0]
             ]

    floyd_warshall(graph)
