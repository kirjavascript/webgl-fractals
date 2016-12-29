import { scaleSequential, interpolateViridis } from 'd3-scale';
import styles from './styles.scss';
import { drawTree } from './drawtree';
import { resize } from './resize';
import './mutate';

export let stage = new PIXI.Container(), tree = {};

// constants //

export const rAngle = Math.PI/2, // 90°
    octAngle = rAngle/2, // 45°
    maxDepth = 10,
    cubeSize = 150;

// load HUD

export let debug = document.createElement('div');
document.body.appendChild(debug);

// init renderer //

export let renderer = PIXI.autoDetectRenderer(256, 256,
    {antialias: !0, transparent: !0, resolution: 1});

renderer.view.className = styles.renderer;

document.body.appendChild(renderer.view);

// init tree //

let colourScale = scaleSequential(interpolateViridis)
    .domain([0, maxDepth]);
export let colourHexNum = (num) => parseInt(colourScale(num).slice(1), 16);

drawTree(tree);
resize();

// main loop //

~function loop() {
    requestAnimationFrame(loop);
    renderer.render(stage);
} ();

