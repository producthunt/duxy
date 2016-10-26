import Namespace from './Namespace'
import Resources from './Resources'
import Resource from './Resource'
import Root from './Root'

export default class Runner {
  constructor (options = {}) {
    this.dsl = {
      resources: this.resources.bind(this),
      resource: this.resource.bind(this),
      namespace: this.namespace.bind(this),
      get: this.get.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      patch: this.patch.bind(this),
      del: this.del.bind(this),
      map: this.map.bind(this)
    }

    this.options = options
    this.root = new Root(this.dsl, options.http)
    this.stack = [this.root]
  }

  resources (name, options, fn) {
    this.addRunnable(new Resources(this.current, name, options, fn))
  }

  resource (name, options, fn) {
    this.addRunnable(new Resource(this.current, name, options, fn))
  }

  namespace (name, options, fn) {
    this.addRunnable(new Namespace(this.current, name, options, fn))
  }

  get (name, options) {
    this.member(name, options, 'GET')
  }

  post (name, options) {
    this.member(name, options, 'POST')
  }

  put (name, options) {
    this.member(name, options, 'PUT')
  }

  patch (name, options) {
    this.member(name, options, 'PATCH')
  }

  del (name, options) {
    this.member(name, options, 'DELETE')
  }

  map (name, fn) {
    this.current.members.push({ name, call: fn })
  }

  get current () {
    return this.stack[this.stack.length - 1]
  }

  draw (fn) {
    this.root.run(fn)
    return this.stack[0].draw({})
  }

  member (name, options, method) {
    const path = options && options.path || name
    this.current.members.push({ name, path, method, force: true })
  }

  addRunnable (collection) {
    this.current.runnables.push(collection)

    this.stack.push(collection)
    collection.run()
    this.stack.pop()
  }
}
