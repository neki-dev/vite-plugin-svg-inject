const nodePath = require("path");
const fs = require("fs/promises");

const isSVGPath = (path) => /\.svg(\.tsx)?$/.test(path);

module.exports = function SVGInjectPlugin(target) {
  return {
    enforce: "pre",
    name: "svg-inject",

    resolveId(path, importer) {
      if (!isSVGPath(path)) {
        return null;
      }

      const svgPath = path.replace(/\.svg$/, ".svg.tsx");
      const resolvedPath = nodePath.join(nodePath.dirname(importer), svgPath);

      return resolvedPath;
    },

    async load(path) {
      if (!isSVGPath(path)) {
        return null;
      }

      const svgPath = path.replace(/\.svg\.tsx$/, ".svg");
      const name = nodePath.basename(svgPath, ".svg");

      const buffer = await fs.readFile(svgPath);
      const svg = String(buffer).replace(/^(<svg.*?)>/i, "$1 {...props}>");

      return target === "react"
        ? `
          import React from "react";
          export default (props = {}) =>
            <div role="figure" data-icon="${name}" dangerouslySetInnerHTML={{ __html: \`${svg}\` }} />;
        `
        : `
          export default (props = {}) => ${svg};
        `;
    },
  };
};
