import express from 'express'
import fs from 'fs/promises'
import path from 'path'

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

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
        await fs.writeFile(fullPath, '[]', 'utf-8')
        res.send([])
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
