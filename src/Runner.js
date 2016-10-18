import Namespace from './Namespace'
import Resources from './Resources'
import Resource from './Resource'
import Root from './Root'

export default class Duxy {
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
      map: this.map.bind(this),
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

  get (name) {
    this.member(name, 'GET')
  }

  post (name) {
    this.member(name, 'POST')
  }

  put (name) {
    this.member(name, 'PUT')
  }

  patch (name) {
    this.member(name, 'PATCH')
  }

  del (name) {
    this.member(name, 'DELETE')
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

  member (name, method) {
    this.current.members.push({ name, path: name, method, force: true })
  }

  addRunnable (collection) {
    this.current.runnables.push(collection)

    this.stack.push(collection)
    collection.run()
    this.stack.pop()
  }
}
