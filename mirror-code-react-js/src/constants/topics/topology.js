export const js = `
var combine = (n, k) => {

    var results = [];
  
    var recursive = (start, result) => {
    
      if (result.length === k) {
        results.push(result.map(value => Number(value)));
      }
      
      for (var i = start; i < n + 1; i++) {
        result.push(i);
        recursive(i + 1, result);
        result.pop();
      }
    }
    recursive(1, []);
    return results;
  }
`;
export const python = `
from collections import defaultdict
class graph:
    def __init__(self, vertices):
        self.adjacencyList = defaultdict(list) 
        self.Vertices = vertices  # No. of vertices
    # function to add an edge to adjacencyList
    def createEdge(self, u, v):
        self.adjacencyList[u].append(v)
    # The function to do Topological Sort.
    def topologicalSort(self):
        total_indegree = [0]*(self.Vertices)
        for i in self.adjacencyList:
            for j in self.adjacencyList[i]:
                total_indegree[j] += 1
        queue = []
        for i in range(self.Vertices):
            if total_indegree[i] == 0:
                queue.append(i)
        visited_node = 0
        order = []
        while queue:
            u = queue.pop(0)
            order.append(u)
            for i in self.adjacencyList[u]:
                total_indegree[i] -= 1

                if total_indegree[i] == 0:
                    queue.append(i)
            visited_node += 1
        if visited_node != self.Vertices:
            print("There's a cycle present in the Graph.\nGiven graph is not DAG")
        else:
            print(order)
G = graph(6)
G.createEdge(0,1)
G.createEdge(0,2)
G.createEdge(1,3)
G.createEdge(1,5)
G.createEdge(2,3)
G.createEdge(2,5)
G.createEdge(3,4)
G.createEdge(5,4)
G.topologicalSort()
`;