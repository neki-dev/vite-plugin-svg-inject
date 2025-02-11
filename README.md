### ⛔ Package is deprecated
Please, use [vite-plugin-svgr](https://www.npmjs.com/package/vite-plugin-svgr)

.

## ⚙️ Vite plugin SVG inject
[![Npm package version](https://badgen.net/npm/v/vite-plugin-svg-inject)](https://npmjs.com/package/vite-plugin-svg-inject)
[![Small size](https://img.badgesize.io/neki-dev/vite-plugin-svg-inject/master/src/index.js)](https://github.com/neki-dev/vite-plugin-svg-inject/blob/master/src/index.js)

Inject SVG content into components

.

* ### Install

```sh
npm i vite-plugin-svg-inject -D
```

* ### Configure

```js
import { defineConfig } from "vite";
import SVGInjectPlugin from "vite-plugin-svg-inject";

export default defineConfig({
  plugins: [
    // Target:
    // - "react" - If JSX library is React
    // - "other" (default) - For others libraries
    SVGInjectPlugin(target)
  ],
})
```

* ### Example

```js
import MyIcon from './images/icon.svg';

function MyComponent() {
  return (
    <div>
      <MyIcon width="32" fill="red" />
    </div>
  );
}
```