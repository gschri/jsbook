import localForage from 'localforage'
import * as esbuild from 'esbuild-wasm';
import axios from 'axios'

export let fecthPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        }
        let cachedResult = await localForage.getItem<esbuild.OnLoadResult>(args.path);
        if (cachedResult) {
          return cachedResult
        }
        let { data, request } = await axios.get(args.path)

        let result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        }

        await localForage.setItem(args.path, result)

        return result
      });


    }
  }
}
