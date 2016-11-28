# Duxy

[![npm version](https://img.shields.io/npm/v/duxy.svg)](https://www.npmjs.com/package/duxy) [![License](https://img.shields.io/npm/l/duxy.svg)](https://www.npmjs.com/package/duxy) [![Build Status](https://travis-ci.org/producthunt/duxy.svg)](https://travis-ci.org/producthunt/duxy)

RESTful resources.

## Table of Contents

  1. [Installation](#installation)
  1. [Usage](#usage)
    1. [Setup](#setup)
    1. [Usage](#usage-1)
    1. [DSL](#dsl)
      1. [resources](#resourcesname--path-only-findone-findall-create-update-delete-fn)
      1. [resource](#resourcename--path-only-findone-create-update-delete--fn)
      1. [namespace](#namespacename--path--fn)
      1. [get](#getname--path-)
      1. [post](#postname--path-)
      1. [put](putname--path-)
      1. [patch](#patchname--path-)
      1. [del](#delname--path-)
    1. [Adapter](#adapter)
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

const http = duxySuperagent(request)(() => {});

export default duxy({ http }, ({ get, resources, resource }) => {
  get('about');

  resources('posts', { only: ['findAll', 'findOne'] }, () => {
    resource('followers', { only: ['create', 'delete'] });
  });
});
```

#### Usage

```js
import api from 'ph/api';

const { body } = api.about();                      // GET /about
const { body } = api.posts.findOne({ id: 1 });     // GET /posts/1
const { body } = api.posts.findAll({ limit: 10 }); // GET /posts?limit=10
```
#### DSL

##### `resources(name, { path, only: ['findOne', 'findAll', 'create', 'update', 'delete']}, fn)`

```js
export default duxy(options, ({ get, resources }) => {
  resources('users', () => {
    get('moreInfo', { path: 'info' });
  });
});
```

```js
api.users.findAll({ id: 1 });        // GET /users
api.users.findOne({ id: 1 });        // GET /users/1
api.users.create({ id: 1, name });   // POST /users/1
api.users.update({ id: 1, name });   // PUT /users/1
api.users.delete({ id: 1 });         // DELETE /users/1
api.users.moreInfo({ userId: 1 });   // GET /users/1/info
```

##### `resource(name, { path, only: ['findOne', 'create', 'update', 'delete'] }, fn)`

```js
export default duxy(options, ({ resources, resource }) => {
  resources('users', { only: ['findOne'] }, () => {
    resource('followers', { path: 'following', only: ['findOne', 'create', 'delete'] });
  });
});
```

```js
api.users.followers.findOne({ userId: 1 });  // GET /users/1/following
api.users.followers.create({ userId: 1 });   // POST /users/1/following
api.users.followers.delete({ userId: 1 });   // DELETE /users/1/following
```

##### `namespace(name, { path }, fn)`

```js
export default duxy(options, ({ get, patch, namespace }) => {
  namespace('my', () => {
    get('profile');
    namespace('settings', () => {
      patch('edit');
    });
  });
});
```

```js
api.my.profile();        // GET /my/profile
api.my.settings.edit();  // PATCH /my/settings/edit
```

##### `get(name, { path })`

```js
export default duxy(options, ({ get }) => {
  get('root', { path: '/' });
  get('search');
});
```

```js
api.root();                   // GET /
api.search({ query: 'foo' }); // GET /search?query=foo
```

##### `post(name, { path })`

```js
export default duxy(options, ({ post }) => {
  post('create');
  post('createPost', { path: '/posts' });
});
```

```js
try {
  const { body } = await api.createPost({ title, name }); // POST /posts
  // handle response
} catch(e) {
  const { response: { body: { errors } } } = e;
  // handle errors
}
```

##### `put(name, { path })`

```js
export default duxy(options, ({ put }) => {
  put('update');
  put('updatePost', { path: '/posts' });
});
```

```js
try {
  const { body } = await api.updatePost({ id, title, name }); // PUT /posts
  // handle response
} catch(e) {
  const { response: { body: { errors } } } = e;
  // handle errors
}
```

##### `patch(name, { path })`

```js
export default duxy(options, ({ patch }) => {
  patch('update');
  patch('updatePost', { path: '/posts' });
});
```

```js
try {
  const { body } = await api.updatePost({ id, title, name }); // PATCH /posts
  // handle response
} catch(e) {
  const { response: { body: { errors } } } = e;
  // handle errors
}
```

##### `del(name, { path })`

```js
export default duxy(options, ({ del }) => {
  del('posts');
});
```

```js
api.del();  // DELETE /posts
```

#### Adapter

```
const http = ({ method, url, body, query }) => {
  return new Promise((resolve, reject) => {
    // should be:
    // resolve({ body: responseBody });
    // reject({ request: { body: responseBody } });
  });
};

export default duxy({ http }, definition);
```

__Superagent adapter__

```
$ npm install duxy-superagent --save
```

```js
// api.js
import duxy from 'duxy';
import duxySuperagent from 'duxy-superagent';
import request from 'superagent';

const http = duxySuperagent(request)(() => {});

export default duxy({ http }, definition);
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
