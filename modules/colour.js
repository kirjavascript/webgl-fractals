import { interpolateViridis, scaleSequential } from 'd3-scale';
import { maxDepth } from './index';

export let colourScale = scaleSequential(interpolateViridis)
    .domain([0, maxDepth]);
export let colourHexNum = (num) => parseInt(colourScale(num).slice(1), 16);