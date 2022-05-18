import express from 'express'


export let serve = (port: number, filename: string, dir: string) => {
  var app = express()
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject)
  })
}
