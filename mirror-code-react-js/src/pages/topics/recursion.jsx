import React from 'react';

import SimpleNav from '../../components/simple-nav';
import CenterContent from '../../components/center-content';
import VisualizerOverlay from '../../components/visualizer-overlay';

export default function Recursion() {
  return (
    <>
      <SimpleNav />
      <CenterContent>
        <div>
          <h1>Recursion</h1>
          <p>
            Recursion is a process in which a function calls itself as a subroutine. This allows the function to be repeated several times, since
            it calls itself during its execution. The process of recursion can be illustrated by a loop. However, recursion is not the same as
            looping. For example, when a function is called within the function, it is called recursion. When a loop is used to execute code
            repeatedly, it is called iteration.
            
          </p>
          <VisualizerOverlay imageUrl={'/assets/recursion1.png'} visualizerUrl={'http://localhost:3007/'} />

          <br />
          <img src={'/assets/recursion.png'} width="100%" alt="recursion" />
          <br />
          <br />
          <img src={'/assets/call_stack.jpg'} width="100%" alt="call_stack" />
          <br />
        </div>
      </CenterContent>
    </>
  );
}
