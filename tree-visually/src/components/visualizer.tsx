import { useContext, useState } from 'react';

import Xarrow, { Xwrapper } from 'react-xarrows';
import { TransformWrapper, TransformComponent } from '@myonim/react-zoom-pan-pinch';

// components
import Node from './node';
import ErrorView from './errorView';
import ToggleSwitch from './toggleSwitch';

import { CodeContext } from '../App';

// styles
import classes from './visualizer.module.css';

export default function Visualizer() {
  const [, setRerender] = useState({});
  const [checked, setChecked] = useState<boolean>(false);
  const [isMoveable, setIsMoveable] = useState<boolean>(false);

  const xArrows: any[] = [];

  const { viewData } = useContext(CodeContext);

  const onMove = () => {
    setIsMoveable(true);
    forceRerender();
  };

  const onStop = () => {
    setIsMoveable(false);
    forceRerender();
  };

  const forceRerender = () => setRerender({});

  const errorMessage = viewData.errorMessage;
  const successfulViewData = viewData.successfulViewData;

  return (
    <>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        disabled={isMoveable}
        doubleClick={{ disabled: true }}
        limitToBounds={false}
        onPanning={forceRerender}
        onWheel={forceRerender}
      >
        {({ state }) => (
          <>
            {/* show error overlay while preserving view structure */}
            {errorMessage && <ErrorView message={errorMessage} />}

            <div className={classes.hoveringMenu}>
              <p>
                Zoom <span>x{state.scale.toPrecision(1)}</span>
              </p>
              <div className={classes.highlight}>
                Highlight
                <ToggleSwitch checked={checked} onChange={setChecked} />
              </div>
            </div>

            <TransformComponent>
              <Xwrapper>
                <div className={classes.visualizerView}>
                  {Object.keys(successfulViewData).map((nodeId) => {
                    // add arrow to xArrows list just to render outside of transform wrapper(scaling bug)
                    xArrows.push(
                      <Xarrow
                        key={nodeId}
                        // path="grid"
                        zIndex={-99}
                        dashness={true}
                        curveness={0.1}
                        start={nodeId}
                        end={successfulViewData[nodeId]['parent']['text']}
                        showHead={false}
                        strokeWidth={checked ? 2 : 1}
                        color={!checked ? '#72737a' : viewData['darkSide'] ? 'aquamarine' : '#316896'}
                      />
                    );

                    return (
                      <Node
                        key={nodeId}
                        onMove={onMove}
                        onStop={onStop}
                        checked={checked}
                        scale={state.scale}
                        darkSide={viewData['darkSide']}
                        nodeData={successfulViewData[nodeId]}
                      />
                    );
                  })}
                </div>
              </Xwrapper>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
      {xArrows}
    </>
  );
}
