import networkx as nx
import matplotlib.pyplot as plt

g = nx.read_weighted_edgelist("i3.txt", create_using=nx.DiGraph(), nodetype=int)
pos = nx.spring_layout(g)
nx.draw_networkx(g, with_labels=True, pos=pos, node_size=500, node_color="c")
nx.draw_networkx_edge_labels(g, pos=pos, edge_labels=nx.get_edge_attributes(g, 'weight'))
plt.axis("off")
plt.show()


def dijkstra(graph, start, end):
    # empty dictionary to hold distances
    distances = {}
    # list of vertices in path to current vertex
    predecessors = {}

    # get all the nodes that need to be assessed
    to_assess = graph.keys()

    # set all initial distances to infinity
    #  and no predecessor for any node
    for node in graph:
        distances[node] = float('inf')
        predecessors[node] = None

    # set the initial collection of
    # permanently labelled nodes to be empty
    sp_set = []

    # set the distance from the start node to be 0
    distances[start] = 0

    # as long as there are still nodes to assess:
    while len(sp_set) < len(to_assess):

        # chop out any nodes with a permanent label
        still_in = {node: distances[node] \
                    for node in [node for node in \
                                 to_assess if node not in sp_set]}

        # find the closest node to the current node
        closest = min(still_in, key=distances.get)

        # and add it to the permanently labelled nodes
        sp_set.append(closest)

        # then for all the neighbours of
        # the closest node (that was just added to
        # the permanent set)
        for node in graph[closest]:
            # if a shorter path to that node can be found
            if distances[node] > distances[closest] + \
                    graph[closest][node]:
                # update the distance with
                # that shorter distance
                distances[node] = distances[closest] + \
                                  graph[closest][node]

                # set the predecessor for that node
                predecessors[node] = closest

    # once the loop is complete the final
    # path needs to be calculated - this can
    # be done by backtracking through the predecessors
    path = [end]
    while start not in path:
        try:
            path.append(predecessors[path[-1]])
        except Exception:
            print("Can't calculate the path")
            break

    # return the path in order start -> end, and it's cost
    return path[::-1], distances[end]


if __name__ == '__main__':
    graph = {
        '1': {'2': 1, '4': 1},
        '2': {'1': 1, '4': 1, '3': 2},
        '3': {'2': 2, '4': 1, '5': 1, '6': 1},
        '4': {'1': 1, '2': 1, '3': 1, '5': 2, '6': 15},
        '5': {'3': 1, '4': 2, '6': 1},
        '6': {'3': 1, '4': 15, '5': 1}
    }

    graph2 = {
        '1': {'2': 12, '3': 4, '4': 17},
        '2': {'4': 10},
        '3': {'5': 4, '8': 10},
        '4': {'2': 10, '7': 16},
        '5': {'3': 4, '6': 4, '8': 4},
        '6': {'3': 10, '4': 10, '5': 4, '8': 7},
        '7': {'4': 16},
        '8': {'3': 10, '5': 4, '6': 7, '7': 18}
    }

    path, distance = dijkstra(graph2, start='1', end='7')

    print("\nPath:\n==============================")
    print(path)

    print("\nShortest Distance:\n==============================")
    print(distance)