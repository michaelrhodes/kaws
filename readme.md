# kaws

a slight reworking of [lukeed/sockette](https://github.com/lukeed/sockette) that allows event listeners to be added after instantiation

## install
```sh
pnpm install michaelrhodes/kaws#1.0.0
```

## use
```js
var kaws = require('kaws')

var ws = kaws('ws://localhost')
ws.onerror = console.error
ws.onmessage = console.log
ws.onreconnect = console.info

ws.send('hello')
```

## obey
[MIT](https://opensource.org/licenses/MIT)
