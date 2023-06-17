import React from "react";

import { Prism } from "@mantine/prism";

import { js, python, cpp } from "../../constants/topics/stack";

import SimpleNav from "../../components/simple-nav";
import CenterContent from "../../components/center-content";

export default function BackTracking() {
  return (
    <>
    <SimpleNav />
    <CenterContent>
      <div>
        <h1>Backtracking Algorithm</h1>
        <p>In this tutorial, you will learn what a backtracking algorithm is. Also, you will find an example of a backtracking approach.<br></br>

A backtracking algorithm is a problem-solving algorithm that uses <strong> a brute force approach</strong> for finding the desired output. <br/><br/>

The term backtracking suggests that if the current solution is not suitable, then backtrack and try other solutions. Thus, recursion is used in this approach.

This approach is used to solve problems that have multiple solutions. If you want an optimal solution, you must go for dynamic programming. <br/>
        </p>
        <br />
        <h2>State Space Tree</h2>
        <p>A space state tree is a tree representing all the possible states (solution or nonsolution) of the problem from the root as an initial state to the leaf as a terminal state.</p>
        <img src={'/assets/bt.PNG'} width="50%" style={{margin : "0 auto",display : "block",backgroundColor : "white"}} alt="logo" />
        <br />
        <h3>Backtracking Algorithm Applications</h3>
        <p>
        <ol>
          <li>
          To find all Hamiltonian Paths present in a graph.
          </li>
          <li>To solve the N Queen problem.</li>
          <li>Maze solving problem.</li>
          <li>The Knight's tour problem.</li>
        </ol>
And, if you want the plate at the bottom, you must first remove all the plates on top. This is exactly how the stack data structure works.
        </p>
        <br />
        <hr></hr>
        <h2>When to Use a Backtracking Algorithm?
</h2>
<p>There are the following scenarios in which you can use the backtracking:
          <ul>
            <li>It is used to solve a variety of problems. You can use it, for example, to find a feasible solution to a decision problem.</li>
            <li>Backtracking algorithms were also discovered to be very effective for solving optimization problems.</li>
            <li>In some cases, it is used to find all feasible solutions to the enumeration problem.</li>
            <li>On popping an element, we return the element pointed to by TOP and reduce its value.</li>
            <li>Backtracking, on the other hand, is not regarded as an optimal problem-solving technique. It is useful when the solution to a problem does not have a time limit.

</li>
<li>Before popping, we check if the stack is already empty</li>
          </ul>
        </p>
        {/* <h2>Stack Implementations in Python, Java, C, and C++
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
        </Prism.Tabs> */}
        <br/> <br/>    <br/>
        <h1 style={{textAlign  : 'center'}}>You have successfully completed this topic!</h1>
        <br/><br/>
      </div>
    </CenterContent>
  </>
  );
}
