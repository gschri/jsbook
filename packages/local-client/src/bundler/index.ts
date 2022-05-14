import * as esbuild from 'esbuild-wasm'
import { fecthPlugin } from './plugins/fetch-plugin'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'

let service: esbuild.Service
let bundle = async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    })
  }

  let result = await service.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fecthPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window',
    }
  })

  return result.outputFiles[0].text

}

export default bundle;
