import React from 'react';

import SimpleNav from '../../components/simple-nav';
import CenterContent from '../../components/center-content';
import VisualizerOverlay from '../../components/visualizer-overlay';

export default function Sorting() {
  return (
    <>
      <SimpleNav />
      <CenterContent>
        <div>
          <h1>Sorting</h1>
          <p>
            A Sorting Algorithm is used to rearrange a given array or list of elements according to a comparison operator on the elements. The
            comparison operator is used to decide the new order of elements in the respective data structure.
          </p>
          <VisualizerOverlay imageUrl={'/assets/sort.jpg'} visualizerUrl={'https://sortingvisually.web.app/'} />

          <br />
          <img src={'/assets/sorting.PNG'} width="100%" alt="sorting" />
          <br />
          <br />
          <img src={'/assets/sortingComplexity.PNG'} width="100%" alt="sortingComplexity" />
          <br />
        </div>
      </CenterContent>
    </>
  );
}
