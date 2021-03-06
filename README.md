# rxjs.node

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![Build Status](https://img.shields.io/travis/dignifiedquire/rxjs.node/master.svg?style=flat-square)](https://travis-ci.org/dignifiedquire/rxjs.node)
[![Coverage Status](https://coveralls.io/repos/github/dignifiedquire/rxjs.node/badge.svg?branch=master)](https://coveralls.io/github/dignifiedquire/rxjs.node?branch=master)
[![Dependency Status](https://david-dm.org/dignifiedquire/rxjs.node.svg?style=flat-square)](https://david-dm.org/dignifiedquire/rxjs.node)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

> Tooling to adapt node.js core functionality into RxJS


## API

### `fromStream(stream)`

Takes in a node-stream and returns a `Subject`.

### `toCallback(observable, cb)`

Convert an observable into a node-style callback.

### `toPromise(observable)`

Convert an observable into a promise. (Requires global `Promise`)

### `SocketSubject(options)`

### `StreamSubject(options)`

## Acknowledgements

Thank you to all the contributors on these projects for going before me.

- https://github.com/Reactive-Extensions/rx-node
- https://github.com/HackerHappyHour/rxjs-node
- https://github.com/Reactive-Extensions/RxJS
