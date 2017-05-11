import { scaleLinear } from 'd3-scale';
import { tree, octAngle, rAngle, cubeSize } from './index';

let globalScale = scaleLinear().domain([1,0]).range([0,2]);

document.body.addEventListener('mousemove', (e) => {
    let tilt = ((e.pageX / window.innerWidth) -.5) * 4;
    let scale = (e.pageY / window.innerHeight);
    mutate(tilt, scale);
});
document.body.addEventListener('touchmove', (e) => {
    let tilt = ((e.touches[0].pageX / window.innerWidth) -.5) * 4;
    let scale = (e.touches[0].pageY / window.innerHeight);
    mutate(tilt, scale);
});

function mutate(tiltDelta, scaleDelta) {

    // tiltDelta = 0;

    let gScale = globalScale(scaleDelta);

    ~function recurse(node) {

        if (!node.children) return;

        let [left, right] = node.children;

        {   // left

            let angle = (octAngle/3)*(3 + tiltDelta);

            // angle *= gScale;

            let scale = Math.cos(angle) * gScale;
            let rotation = -angle * gScale;

            left.cube.scale = new PIXI.Point(scale, scale);
            left.cube.rotation = rotation;

            let { dx, dy } = dxdy(angle, gScale);

            // console.log(dx);

            let calcX = (-.5 - dx) * gScale;
            let calcY = (-1 + dy) * (gScale);

            left.cube.position = new PIXI.Point(
                (calcX*cubeSize)+((cubeSize/2)),
                (calcY*cubeSize)+(cubeSize/2)
            );
        }

        {   // right
            let angle = (octAngle/3)*(3 - tiltDelta);

            let scale = Math.cos(angle) * gScale;
            let rotation = angle * gScale;

            right.cube.scale = new PIXI.Point(scale, scale);
            right.cube.rotation = rotation;

            let { dx, dy } = dxdy(angle, gScale);

            let calcX = (.5 + dx) * gScale;
            let calcY = (-1 + dy) * gScale;

            right.cube.position = new PIXI.Point(
                (calcX*cubeSize)+((cubeSize/2)),
                (calcY*cubeSize)+(cubeSize/2)
            );
        }

        if (node.children) {
            node.children.forEach(recurse);
        }

    } (tree);
}

function dxdy(angle, gScale = 1) {

    // dx

    let squRadius = ((Math.cos(angle)) / Math.SQRT2); // circle radius

    let dx = squRadius * Math.tan(angle-octAngle); // actual dx - 0.5

    // dy

    let dxHyp = Math.cos(rAngle-angle) * (Math.cos(angle)); // dx of hyp

    let dy = Math.cos(angle-octAngle) * (((0.5 * gScale)-dxHyp) + dx);

    return { dx, dy };
}
