import networkx as nx
import matplotlib.pyplot as plt

g = nx.read_weighted_edgelist("i3.txt", create_using=nx.DiGraph(), nodetype=int)
pos = nx.spring_layout(g)
nx.draw_networkx(g, with_labels=True, pos=pos, node_size=500, node_color="y")
nx.draw_networkx_edge_labels(g, pos=pos, edge_labels=nx.get_edge_attributes(g, 'weight'))
plt.axis("off")
plt.show()


def bellman_ford(graph):
    # Step 1: Prepare the distance and predecessor for each node
    distance, predecessor = dict(), dict()

    for node in graph:
        distance[node], predecessor[node] = float('inf'), None
    distance[1] = 0.0

    # Step 2: Relax the edges
    for i in range(len(graph) - 1):
        for node in graph:
            for neighbour in graph[node]:
                # If the distance between the node and the neighbour is lower than the current, store it
                if distance[neighbour] > distance[node] + graph[node][neighbour]["weight"]:
                    distance[neighbour], predecessor[neighbour] = distance[node] + graph[node][neighbour][
                        "weight"], node

    # Step 3: Check for negative weight cycles
    for node in graph:
        for neighbour in graph[node]:
            assert distance[neighbour] <= distance[node] + graph[node][neighbour]["weight"], "Negative weight cycle."

    return distance, predecessor


if __name__ == '__main__':

    graph = nx.to_dict_of_dicts(g)
    predecessor, distance = bellman_ford(graph)

    print("\nShortest Distance:\n==============================")
    print(distance)

    print("Predecessors:\n==============================")
    print(predecessor)
