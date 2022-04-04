## Vite plugin SVG inject
[![Npm package version](https://badgen.net/npm/v/vite-plugin-svg-inject)](https://npmjs.com/package/vite-plugin-svg-inject)
[![Small size](https://badge-size.herokuapp.com/neki-dev/vite-plugin-svg-inject/master/dist/index.js)](https://github.com/neki-dev/vite-plugin-svg-inject/blob/master/dist/index.js)

Inject SVG content into components

.

* ### Install

```sh
npm i vite-plugin-svg-inject --save-dev
```

* ### Usage

```js
import { defineConfig } from "vite";
import SVGInjectPlugin from "vite-plugin-svg-inject";

export default defineConfig({
  plugins: [
    SVGInjectPlugin(),
  ],
})
```