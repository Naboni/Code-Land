import React from 'react';

import { Button } from '@mantine/core';

import classes from './visualizer-overlay.module.css';

export default function VisualizerOverlay({ imageUrl, visualizerUrl }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay}>
        <h1>You can learn this topic visually</h1>
        <a href={visualizerUrl} target="_blank" rel="noreferrer">
          <Button>GO TO VISUALIZATION</Button>
        </a>
      </div>
      <img className={classes.visualizer} src={imageUrl} width="100%" alt="logo" />
    </div>
  );
}
