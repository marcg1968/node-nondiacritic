# Remove diacritics from a string

## Usage

### CommonJS

```javascript
const diac = require('@marcg68/nondiacritic')

const str = 'Über ähnlich'

console.log(diac.removeDiacritics(str))

console.log(diac.removeDiacritics(str, { ucfirst: true }))

```

outputs

```json
{ original: 'Über ähnlich', replaced: 'UEber aehnlich' }
{ original: 'Über ähnlich', replaced: 'Ueber aehnlich' }
```

### ES6

```javascript
import { removeDiacritics } from '@marcg68/nondiacritic'

const str = 'Über ähnlich'

console.log(removeDiacritics(str))
```

outputs

```json
{ original: 'Über ähnlich', replaced: 'UEber aehnlich' }
```

## Intro

Based on https://github.com/andrewrk/node-diacritics/

## Refs

- https://whitep4nth3r.com/blog/how-to-build-test-and-release-node-module-es6/
- https://github.com/whitep4nth3r/random-code/blob/main/src/index.js
- https://medium.com/swlh/how-to-publish-an-es6-module-to-npm-43dda8aabbf
- https://medium.com/@alexishevia/the-magic-behind-npm-link-d94dcb3a81af

## Setup

Using `npm`

```bash
npm init --scope=@marcg68
npm install --save-dev babel-cli babel-preset-es2015
```

Write the code  in `src/index.js`, with the following single code line in the entry point `app.js`:

```javascript
module.exports = require('./dist')
```

Add ```"build": "babel src -d dist"```

to top level ```"scripts"``` key in `package.json`, which when 

```bash
npm run build
```

is run, will compile the `src` and place into `dist`.

## Testing

```bash
npm link # allows the module to be loaded from anywhere on the same machine
```

In a another directory on the same box, initialise a project with `npm` and link the module.

```bash
npm init -y
npm link @marcg68/nondiacritic
```

On the commandline:

```bash
node -e ';(async () => console.log((await import("@marcg68/nondiacritic")).removeDiacritics("Über ähnlich")))()'
```

should output: 

```javascript
{ original: 'Über ähnlich', replaced: 'UEber aehnlich' }
```

## Publishing

```bash
npm publish --access public
```
