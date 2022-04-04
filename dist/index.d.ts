declare function pluginSVGInject(): {
    enforce: string;
    name: string;
    resolveId(path: string, importer: string): string;
    load(path: string): Promise<string>;
};
export = pluginSVGInject;
