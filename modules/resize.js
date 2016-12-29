import { tree, renderer, cubeSize } from './index';

export let dimensions = {
    width: window.innerWidth,
    height: window.innerHeight
};

function respond() {
    dimensions.width = window.innerWidth;
    dimensions.height = window.innerHeight;
    let { width, height } = dimensions;
    renderer.resize(width, height);

    if (tree.cube) {
        let scale = window.innerWidth / 1200;
        tree.cube.position = new PIXI.Point((width/2), height-(scale * cubeSize/2));
        tree.cube.scale = new PIXI.Point(scale, scale);
    }

}

export function resize() {
    renderer.autoResize = true;
    window.addEventListener('resize', respond);
    respond();
}