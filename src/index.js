const nodePath = require('path');
const fs = require('fs/promises');

const isSVGPath = (path) => /\.svg(\.tsx)?$/.test(path);

module.exports = function SVGInjectPlugin() {
  return {
    enforce: 'pre',
    name: 'svg-inject',

    resolveId(path, importer) {
      if (!isSVGPath(path)) {
        return null;
      }

      const svgPath = path.replace(/\.svg$/, '.svg.tsx');
      const resolvedPath = nodePath.join(nodePath.dirname(importer), svgPath);

      return resolvedPath;
    },

    async load(path) {
      if (!isSVGPath(path)) {
        return null;
      }

      const svgPath = path.replace(/\.svg\.tsx$/, '.svg');
      const buffer = await fs.readFile(svgPath);
      const content = String(buffer);
      const exportContent = `
        export default (props = {}) => 
          ${content.replace(/^(<svg.*?)>/i, '$1 {...props}>')}
      `;

      return exportContent;
    },
  };
};
