# WebGL Fractals

Inspired by [SVG fractals with React](https://swizec.com/blog/animating-svg-nodes-react-preact-inferno-vue/swizec/7311)

SVG is a bad choice for this task as manipulating 2k+ DOM nodes at once is extremely slow.

Using webGL allows us to use the GPU and get insanely smooth animation.

With some performance tweaks, it's possible to animate 32k nodes and retain full speed. That's 16 times as many as the SVG versions.

![](/tree.gif)
