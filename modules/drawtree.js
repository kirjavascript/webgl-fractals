import { maxDepth, tree, stage, cubeSize, octAngle, colourHexNum, debug } from './index';
import { dimensions } from './resize';

export function drawTree(node, depth = 0) {

    if (depth >= maxDepth) return;

    else if (!depth) {
        // draw extra root at depth 0
        node.cube = drawCube(stage, {fill: colourHexNum(depth), x: 0, y: 0, rot: 0, scale: 1, root: true});
    }

    let parentCube = node.cube;

    let right = drawCube(parentCube, {
        fill: colourHexNum(depth),
        x: (.5),
        y: (-1),
        rot: octAngle,
        scale: Math.cos(octAngle)
    });

    let left = drawCube(parentCube, {
        fill: colourHexNum(depth),
        x:-.5,
        y:-1,
        rot: -octAngle,
        scale: Math.cos(octAngle)
    });

    node.children = [{cube: left}, {cube: right}];

    node.children.forEach((child) => {
        drawTree(child, depth+1);
    });

}

function drawCube(stage, obj) {
    let {fill, scale, x, y, rot, root = false} = obj;
    let { width, height } = dimensions;
    let graphics = new PIXI.Graphics();

    graphics.scale = new PIXI.Point(scale, scale);
    graphics.beginFill(fill);
    graphics.drawRect(0, 0, cubeSize, cubeSize);
    graphics.rotation = rot;
    graphics.pivot = new PIXI.Point(cubeSize/2, cubeSize/2);

    let calcX = root ? (width/2) : (x*cubeSize)+((cubeSize/2));
    let calcY = root ? (height)-(cubeSize/2) : (y*cubeSize)+(cubeSize/2);
    graphics.position = new PIXI.Point(calcX, calcY);
    
    stage.addChild(graphics);

    // debug.textContent++;

    return graphics;
}