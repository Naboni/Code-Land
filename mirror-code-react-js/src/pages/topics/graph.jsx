import React from 'react';

import SimpleNav from '../../components/simple-nav';
import CenterContent from '../../components/center-content';
import VisualizerOverlay from '../../components/visualizer-overlay';

export default function Graph() {
  return (
    <>
      <SimpleNav />
      <CenterContent>
        <div>
          <h1>Graph Data Structure And Algorithms</h1>
          <VisualizerOverlay imageUrl={'/assets/path.jpg'} visualizerUrl={'https://pathfinder-visually.web.app/'} />
          <p>
            A Graph is a non-linear data structure consisting of vertices and edges. The vertices are sometimes also referred to as nodes and the
            edges are lines or arcs that connect any two nodes in the graph. More formally a Graph is composed of a set of vertices( V ) and a set of
            edges( E ). The graph is denoted by G(E, V).
          </p>
          <br />
          <img src={'/assets/graph.jpg'} width="100%" alt="logo" />
          <br />
          <br />
          <h3>Components of a Graph</h3>
          <ul>
            <li>
              Vertices: Vertices are the fundamental units of the graph. Sometimes, vertices are also known as vertex or nodes. Every node/vertex can
              be labeled or unlabelled.
            </li>

            <li>
              Edges: Edges are drawn or used to connect two nodes of the graph. It can be ordered pair of nodes in a directed graph. Edges can connect
              any two nodes in any possible way. There are no rules. Sometimes, edges are also known as arcs. Every edge can be labeled/unlabelled.
            </li>
          </ul>
          <p>
            Graphs are used to solve many real-life problems. Graphs are used to represent networks. The networks may include paths in a city or
            telephone network or circuit network. Graphs are also used in social networks like linkedIn, Facebook. For example, in Facebook, each
            person is represented with a vertex(or node). Each node is a structure and contains information like person id, name, gender, locale etc.
          </p>
          <br />
          <br />
        </div>
      </CenterContent>
    </>
  );
}
