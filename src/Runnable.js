import createEndpoint from './createEndpoint'

export default class Runnable {
  constructor () {
    this.runnables = []
    this.members = []
  }

  create () {
    const callable = { __path: this.path }

    const basePath = this.path
    const http = this.adapter()
    const allowed = this.options.only

    this.finders.concat(this.members).forEach((member) => {
      callable[member.name] = createEndpoint(member, { allowed, basePath, http })
    })

    return callable
  }

  draw (tree = {}) {
    return this.runnables.reduce((tree, runnable) => {
      tree[runnable.name] = runnable.create()
      runnable.draw(tree[runnable.name])
      return tree
    }, tree)
  }

  adapter () {
    return this.options.http || (this.parent && this.parent.adapter())
  }

  run () {
    if (this.fn) this.fn()
  }
}
