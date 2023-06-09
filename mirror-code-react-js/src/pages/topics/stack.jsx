import React from "react";

import { Prism } from "@mantine/prism";

import { js, python, cpp } from "../../constants/topics/stack";

import SimpleNav from "../../components/simple-nav";
import CenterContent from "../../components/center-content";

export default function Stack() {
  return (
    <>
    <SimpleNav />
    <CenterContent>
      <div>
        <h1>Stack</h1>
        <p>
        In this tutorial, you will learn about the stack data structure and its implementation in Python, Java and C/C++.

A stack is a linear data structure that follows the principle of Last In First Out (LIFO). This means the last element inserted inside the stack is removed first.

You can think of the stack data structure as the pile of plates on top of another.


        </p>
        <br />
        <img src={'/assets/stack.PNG'} width="50%" style={{margin : "0 auto",display : "block"}} alt="logo" />
        <br />
        <p>
        Here, you can: <br/>
        <ul>
          <li>
          Put a new plate on top
          </li>
          <li>Remove the top plate</li>
        </ul>
And, if you want the plate at the bottom, you must first remove all the plates on top. This is exactly how the stack data structure works.
        </p>
        <br />
        <hr></hr>
        <h2>LIFO Principle of Stack</h2>
        <p>In programming terms, putting an item on top of the stack is called <strong>push</strong>  and removing an item is called <strong>pop</strong>.

</p>
        <br />
        <div style={{backgroundColor : 'white'}}>
        <img src={'/assets/stack2.PNG'} width="100%" alt="logo" />
        </div>
        <br/>
       <p>In the above image, although item 3 was kept last, it was removed first. This is exactly how the <strong>LIFO (Last In First Out)</strong>  Principle works.
<br/><br/>
We can implement a stack in any programming language like C, C++, Java, Python or C#, but the specification is pretty much the same.</p>
        <br/>
        <h2>Basic Operations of Stack
</h2>
        <p>There are some basic operations that allow us to perform different actions on a stack.
          <ul>
            <li>Push: Add an element to the top of a stack</li>
            <li>Pop: Remove an element from the top of a stack</li>
            <li>IsEmpty: Check if the stack is empty</li>
            <li>IsFull: Check if the stack is full</li>
            <li>Peek: Get the value of the top element without removing it

</li>
          </ul>
        </p>
        <br/>
        <h2>Working of Stack Data Structure
</h2>
<p>The operations work as follows:
          <ol>
            <li>A pointer called TOP is used to keep track of the top element in the stack.</li>
            <li>When initializing the stack, we set its value to -1 so that we can check if the stack is empty by comparing TOP == -1.</li>
            <li>On pushing an element, we increase the value of TOP and place the new element in the position pointed to by TOP.</li>
            <li>On popping an element, we return the element pointed to by TOP and reduce its value.</li>
            <li>Before pushing, we check if the stack is already full

</li>
<li>Before popping, we check if the stack is already empty</li>
          </ol>
        </p>
        <br/>
        <h2>Stack Implementations in Python, Java, C, and C++
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
