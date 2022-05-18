import express from 'express'
import fs from 'fs/promises'
import path from 'path'

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}


let defaultTextCellContent = `
# JSXDOX

In this environment you can write Javascript snippets *( including \`jsx\` )*, import \`css\` files like in the example below and almost any npm module that runs on the browser or is platform independent ( i.e. is not a node exclusive module )

By running the \`show\` command you can display any \`Javascript\` type, and also \`jsx\` elements and \`react\` components

## Usage

 > \`npx jsxdox serve\` or \`npx jsxdox serve filename.js --port port_number\`

* alternatively, if you want to install it globally:

> \`npm install -g jsxdox\`  

## Features

- [X]  Syntax highlighting
- [X]  Add npm modules using \`import 'module_name'\`
- [X]  Add css files from npm similarly using \`import 'npm_hosted_file.css\` e.g. \`import 'bulma/css/bulma.min.css\`
- [X]  Add specific packages version using \`import 'module_name@module_version'\` e.g. \`import 'react@17.0.2'\`
- [X] Edit any \`text\` cell by clicking on it or close it by clicking outside
- [X] Cumulative code execution (i.e. if you define a variable in one code cell, it will be available in the cells below )
- [X]  Delete or change the order of cells (\`up\` or \`down\`) using the action bar on top right corner of each cell
- [X]  Format code in \`code\` cells by clicking the format button
- [X]  Add new \`code\` or \`text\` cells by hovering over and clicking the respective buttons on the divider between cells
`

let defaultCodeCellContent = `
import 'bulma/css/bulma.min.css'
import 'bulmaswatch@0.8.1/materia/bulmaswatch.min.css'

import {useState} from 'react'

const App = () => {
  [count,setCount] = useState(0)
  const clickPlus = () => setCount(count + 1)
  const clickMinus = () => setCount(Math.max(count - 1,0))

  return (
    <div className="container is-fluid">
      <h1 className="title">Counter: <span>{count}</span></h1>
      <button onClick={clickMinus} className="button is-danger">&#727;</button>
      <button onClick={clickPlus} className="button is-info">&#43;</button>
    </div>
  )
}

show(<App />)
`

let defaultTextCell = { id: "ibk52", content: defaultTextCellContent, type: "text" }
let defaultCodeCell = { id: "vrd3g", content: defaultCodeCellContent, type: "code" }
let defaultCells = [defaultTextCell, defaultCodeCell]

export let createCellsRouter = (filename: string, dir: string) => {
  var router = express.Router()
  router.use(express.json())

  var fullPath = path.join(dir, filename);


  router.get('/cells', async (req, res) => {
    try {
      // Read the file 
      let result = await fs.readFile(fullPath, { encoding: 'utf-8' })

      res.send(JSON.parse(result));
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        // Add code to create file and add default cells
        await fs.writeFile(fullPath, JSON.stringify(defaultCells), 'utf-8')
        res.send(defaultCells)
      } else {
        throw error;
      }
    }

    // If read throws an error
    // Inspect the error, see if it says that the file doesn't exist 

    // Parse a list of cells out of it 
    // Send list of cells back to browser
  })

  router.post('/cells', async (req, res) => {
    // Take the list of cells from the request object
    // Serialize them
    var { cells }: { cells: Cell[] } = req.body;

    // Write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')

    res.send({ status: 'ok' })
  })

  return router;
}
