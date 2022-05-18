# JSXDOX

In this environment you can write Javascript snippets *( including `jsx` )*, import `css` files like in the example below and almost any npm module that runs on the browser or is platform independent ( i.e. is not a node exclusive module )

By running the `show` command you can display any `Javascript` type, and also `jsx` elements and `react` components

## Usage

 > `npx jsxdox serve` or `npx jsxdox serve filename.js --port port_number`

* alternatively, if you want to install it globally:

> `npm install -g jsxdox`  

## Features

- [X]  Syntax highlighting
- [X]  Add npm modules using `import 'module_name'`
- [X]  Add css files from npm similarly using `import 'npm_hosted_file.css` e.g. `import 'bulma/css/bulma.min.css`
- [X]  Add specific packages version using `import 'module_name@module_version'` e.g. `import 'react@17.0.2'`
- [X] Edit any `text` cell by clicking on it or close it by clicking outside
- [X] Cumulative code execution (i.e. if you define a variable in one code cell, it will be available in the cells below )
- [X]  Delete or change the order of cells (`up` or `down`) using the action bar on top right corner of each cell
- [X]  Format code in `code` cells by clicking the format button
- [X]  Add new `code` or `text` cells by hovering over and clicking the respective buttons on the divider between cells
