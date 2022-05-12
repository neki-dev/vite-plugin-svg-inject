import nodePath from 'path';
import { readFile } from 'fs/promises';

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
      const content = String(await readFile(svgPath));
      const exportContent = `
        export default (props = {}) => 
          ${content.replace(/^(<svg.*?)>/i, '$1 {...props}>')}
      `;

      return exportContent;
    },
  };
};
