import Draggable from 'react-draggable';
import { useXarrow } from 'react-xarrows';

import { LooseObject } from '../utils/generateViewData';

// styles
import classes from './node.module.css';

interface IProps {
  checked: boolean;
  darkSide: boolean;
  nodeData: LooseObject;
  scale: number;
  onMove: () => void;
  onStop: () => void;
}

export default function Node({ checked, darkSide, scale, nodeData, onMove, onStop }: IProps) {
  useXarrow();

  const cardStyles = {
    cardBody: !darkSide ? classes.cardWrapperDark : classes.cardWrapperLight,
    cardColHighlight: darkSide ? classes.highlightDark : classes.highlightLight,
    cardColHighlightMore: darkSide ? classes.highlightMoreDark : classes.highlightMoreLight,
  };

  return (
    <Draggable scale={scale} onDrag={onMove} onStop={onStop}>
      <h1 id={nodeData['id']['text']} className={`${classes.cardWrapper} ${cardStyles.cardBody}`}>{nodeData['value']['text']}</h1>
    </Draggable>
  );
}
