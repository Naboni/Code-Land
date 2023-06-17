import React from 'react';

import SimpleNav from '../../components/simple-nav';
import CenterContent from '../../components/center-content';
import VisualizerOverlay from '../../components/visualizer-overlay';

export default function Tree() {
  return (
    <>
      <SimpleNav />
      <CenterContent>
        <div>
          <h1>Tree Data Structure And Algorithms</h1>
          <VisualizerOverlay imageUrl={'/assets/tree.png'} visualizerUrl={'https://tree-visually.vercel.app/'} />
          <p>
          In this tutorial, you will learn about tree data structure. Also, you will learn about different types of trees and the terminologies used in tree.

A tree is a nonlinear hierarchical data structure that consists of nodes connected by edges.
          </p>
          <br />
          <img src={'/assets/tree_0.png'} width="50%" style={{margin : "0 auto",display: "block"}} alt="logo" />
          <br />
          <h2>Why Tree Data Structure?</h2>
        <p>Other data structures such as arrays, linked list, stack, and queue are linear data structures that store data sequentially. In order to perform any operation in a linear data structure, the time complexity increases with the increase in the data size. But, it is not acceptable in today's computational world.
Different tree data structures allow quicker and easier access to the data as it is a non-linear data structure.
</p>
       <hr></hr>
          <h2>Tree Terminologies</h2>
          <h3>Node</h3>
          <p>A node is an entity that contains a key or value and pointers to its child nodes.

The last nodes of each path are called <strong>leaf nodes or external nodes</strong> that do not contain a link/pointer to child nodes.

The node having at least a child node is called an internal node.

</p>
          <h3>Edge</h3>
          <p>It is the link between any two nodes.</p>
          <img src={'/assets/tree_1.png'} width="50%" style={{margin : "0 auto",display: "block",backgroundColor : "white"}} alt="logo" />
          <h3>Root</h3>
          <p>It is the topmost node of a tree.</p>
          <h3>Height of a Node</h3>
          <p>The height of a node is the number of edges from the node to the deepest leaf (ie. the longest path from the node to a leaf node).</p>
          <h3>Depth of a Node</h3>
          <p>The depth of a node is the number of edges from the root to the node.</p>
          <h3>Height of a Tree</h3>
          <p>The height of a Tree is the height of the root node or the depth of the deepest node.</p>
          <h3>Degree of a Node</h3>
          <p>The degree of a node is the total number of branches of that node.

</p>
          <h3>Forest</h3>
          <p>A collection of disjoint trees is called a forest.</p>
          <h2>Types of Tree</h2>
          <ol>
            <li>Binary Tree</li>
            <li>Binary Search Tree</li>
            <li>AVL Tree</li>
            <li>B-Tree</li>
          </ol>
          <br/><br/>
        </div>
      </CenterContent>
    </>
  );
}
