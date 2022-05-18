import { Command } from 'commander'

export let serveCommand = new Command()
  .command('serve')
  .description('Open a file for editing')
  .action(() => {
    console.log('Getting ready to serve a file')
  })
