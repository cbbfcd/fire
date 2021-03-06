# @mooyu/fire

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/alexjoverm/typescript-library-starter.svg)](https://greenkeeper.io/)
[![Travis](https://travis-ci.org/cbbfcd/fire.svg?branch=master)](https://travis-ci.org/cbbfcd/fire.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/cbbfcd/fire/badge.svg)](https://coveralls.io/github/cbbfcd/fire)

a tool via publish the subscription mode

## Usage

```js
npm install @mooyu/fire -D
yarn add @mooyu/fire --dev

// then
import fire from '@mooyu/fire'
```

## API

1. fire.on

```js
// Subscribers subscribe to an event, which can be emit by priority
fire.on(evtName: string, cb: Function, priority: number = Infinity)
```

2. fire.once

```js
// only emit once
fire.once(evtName: string, cb: Function, priority: number = Infinity)
```

3. fire.emit

```js
// A publishing method that triggers a subscribed event.
//The argument can be a string or an array of strings, or it can be passed without arguments（emit all）. data is a message that is pushed to the subscriber.
// The function accepts an array as the return value as a message that the subscriber feeds back to the publisher. Two-way communication
fire.emit(evtName?: string | Array<string>, data?: any) : Array
```
4. fire.off

```js
// cacel the subscribtion
fire.off(evtName: string| Array<string>, fn?: Function)
```
5. fire.destory

```js
// clear all
fire.destory()
```

6. fire.curr

```js
// return all the data in cache object
fire.curr()
```
