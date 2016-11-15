# Duxy

[![npm version](https://img.shields.io/npm/v/duxy.svg)](https://www.npmjs.com/package/duxy) [![License](https://img.shields.io/npm/l/duxy.svg)](https://www.npmjs.com/package/duxy) [![Build Status](https://travis-ci.org/producthunt/duxy.svg)](https://travis-ci.org/producthunt/duxy)

RESTful resources.

## Table of Contents

  1. [Installation](#installation)
  1. [Usage](#usage)
  1. [Development](#development)
  1. [Contributing](#contributing)
  1. [License](#license)

## Installation

```
$ npm install duxy --save
```

## Usage

#### Setup

```js
// api.js
import duxy from 'duxy';
import duxySuperagent from 'duxy-superagent';
import request from 'superagent';

const http = duxySuperagent(superagent)();

export default duxy({ http }, ({ get, resources }) => {
  resources('topics', { only: ['findAll', 'findOne'] }, () => {
      resource('topContributors', { path: 'top_contributors', only: ['findAll'] });
      resource('followers', { only: ['create', 'delete'] });
  });
});
```

#### Usage

```js
import api from 'ph/api';

const { body } = api.context();                              // GET /context
const { body: { data } } = api.topics.findOne({ id: 1 })     // GET /topics/1
const { body: { data } } = api.topics.findAll({ limit: 10 }) // GET /topics?limit=10
```

```js
try {
  await api.topics.followers.create({ topicId: 1 }); // POST /topics/1/followers
} catch(e) {
  const { response: { body: { errors } } } = e;
  // handle errors
}
```

## Development

#### Setup

```shell
$ git clone <this repo>
$ cd duxy
$ npm install
```

#### Tests

Linters:

```shell
$ npm run test:lint
```

Tests:

```shell
$ npm run test:unit
```

All:

```shell
$ npm test
```

## Contributing

We want to make this assertion library as robust and complete as possible. If
you think that there are missing features/assertions, please open a GitHub issue or even
better - a PR.

Bug reports and pull requests are welcome on GitHub. This project is intended to be a
safe, welcoming space for collaboration, and contributors are expected to adhere
to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

## License

[![Product Hunt](http://i.imgur.com/dtAr7wC.png)](https://www.producthunt.com)

```
 _________________
< The MIT License >
 -----------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
