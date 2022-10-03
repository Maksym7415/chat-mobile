import React from 'react';
import {svgs} from './svgs';

function SvgMaker({name, fill, width, height, strokeFill, strokeWidth}) {
  const SVG = svgs[name];

  return (
    <SVG
      fill={fill}
      width={width}
      height={height}
      strokeFill={strokeFill}
      strokeWidth={strokeWidth}
    />
  );
}

export default SvgMaker;
