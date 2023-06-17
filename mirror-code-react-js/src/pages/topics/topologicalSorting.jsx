import React from "react";

import { Prism } from "@mantine/prism";

import { js, python, cpp } from "../../constants/topics/stack";

import SimpleNav from "../../components/simple-nav";
import CenterContent from "../../components/center-content";

export default function TopologicalSorting() {
  return (
    <>
    <SimpleNav />
    <CenterContent>
      <div>
        <h1>Topological Sorting</h1>
        <p>
        Topological Sorting is also known as Kahn’s algorithm and is a popular Sorting Algorithm. Using a directed graph as input, Topological Sort sorts the nodes so that each appears before the one it points to.<br></br>
        <br></br>
        This algorithm is applied on a DAG (Directed Acyclic Graph) so that each node appears in the ordered array before all other nodes are pointed to it. This algorithm follows some rules repeatedly until the sort is completed.
<br/><br/>
To simplify, look at the following example:

        </p>
        <img src={'/assets/ts.PNG'} width="50%" style={{margin : "0 auto",display : "block"}} alt="logo" />
        <br />
      
        <br />
        <p>
        Here, we can see that “A” has no indegree. It means the edge that points to a node. “B” and “C” have a pre-requisite of “A”, then “E” has a pre-requisite of “D” and “F” nodes. Some of the nodes are dependent on other nodes.<br/>Here’s another representation of the above Graph: <br/><br/>
        <img src={'/assets/ts2.PNG'} width="40%%" style={{margin : "0 auto",display : "block"}} alt="logo" />
      
      
        Here’re the steps to do this: <br/><br/>

Step 1) Find the node with zero incoming edges, a node with zero degrees.<br></br><br/>

Step 2) Store that zeroes in-degree node in a Queue or Stack and removes the node from the Graph.<br></br><br/>

Step 3) Then delete the outgoing edge from that node.<br></br><br/>

This will decrement the in-degree count for the next node.<br></br><br/>
Topological ordering requires that the graph data structure will not have any cycle.<br></br><br/>

A graph will be considered a DAG if it follows these requirements:<br></br><br/>

<ul>
    <li> One or more nodes with an indegree value of zero.</li>
    <li>Graph doesn’t contain any cycle</li>
   

</ul>
<br></br>
As long as there’re nodes in the Graph and the Graph is still DAG, we will run the above three steps. Otherwise, the algorithm will fall into the cyclic dependency, and Kahn’s Algorithm won’t be able to find a node with zero in-degree.




        </p>
  
        <br/>
        <h2>Topological  Implementations in Python, Java, C, and C++
</h2>
<p>The most common stack implementation is using arrays, but it can also be implemented using lists.</p>

        <Prism.Tabs defaultValue="javascript">
          <Prism.TabsList>
            <Prism.Tab value="javascript">javascript</Prism.Tab>
            <Prism.Tab value="python">python</Prism.Tab>
            <Prism.Tab value="cpp">cpp</Prism.Tab>
          </Prism.TabsList>

          <Prism.Panel language="js" value="javascript">
            {js}
          </Prism.Panel>
          <Prism.Panel language="python" value="python">
            {python}
          </Prism.Panel>
          <Prism.Panel language="cpp" value="cpp">
            {cpp}
          </Prism.Panel>
        </Prism.Tabs>
        <br/> <br/>    <br/>
        <h1 style={{textAlign  : 'center'}}>You have successfully completed this topic!</h1>
        <br/><br/>
      </div>
    </CenterContent>
  </>
  );
}
