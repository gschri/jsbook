import localForage from 'localforage'
import * as esbuild from 'esbuild-wasm';
import axios from 'axios'

export let fecthPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /^(index\.js)$/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode
        }
      })

      // return cached file if found
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        let cachedResult = await localForage.getItem<esbuild.OnLoadResult>(args.path);
        if (cachedResult) {
          return cachedResult
        }
        return null
      })

      build.onLoad({ filter: /\.css$/ }, async (args: any) => {
        let { data, request } = await axios.get(args.path)


        let escaped = data
          .replace(/\n/g, '') // collapse CSS into a single line
          .replace(/"/g, '\\"') // escape double-quotes
          .replace(/'/g, "\\'") // escape single-quotes

        let contents = `
            let style = document.createElement('style')
            style.innerText = '${escaped}';
            document.head.appendChild(style)
          `

        let result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname
        }

        await localForage.setItem(args.path, result)

        return result

      })

      build.onLoad({ filter: /.*/ }, async (args: any) => {
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
