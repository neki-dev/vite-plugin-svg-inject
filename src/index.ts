import nodePath from 'path';
import { readFile } from 'fs/promises';

function pluginSVGInject() {
  return {
    enforce: 'pre',
    name: 'svg-inject',
    resolveId(path: string, importer: string) {
      if (!path.endsWith('.svg')) {
        return null;
      }

      const resolvedPath = nodePath.join(nodePath.dirname(importer), path);
      const svgPath = resolvedPath.replace(/\.svg$/, '.svg.tsx');

      return svgPath;
    },

    async load(path: string) {
      if (!path.endsWith('.svg')) {
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
}

// export for commonjs
// @ts-ignore
export = pluginSVGInject;
