import path from 'path'
import { Command } from 'commander'
import { serve } from '@jsxdox/local-api'

let isProduction = process.env.NODE_ENV === 'production'

export let serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      var dir = path.join(process.cwd(), path.dirname(filename))
      await serve(parseInt(options.port), path.basename(filename), dir, !isProduction)
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
      )
    } catch (error: any) {
      if (error.code === 'EADRRINUSE') {
        console.error('Port is in use. Try running on a different port.')
      } else {
        console.log("Here's the problem: ", error.message)
      }
      process.exit(1);
    }
  })
