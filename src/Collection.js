import invariant from 'invariant'
import joinUrl from 'url-join'

import Runnable from './Runnable'

export default class Collection extends Runnable {
  constructor (parent, name, options, fn) {
    super()

    invariant(parent, '`parent` is required')
    invariant(name, 'You must specify a name for the given resource or namespace')

    this.parent = parent
    this.name = name

    if (typeof fn === 'function') {
      this.fn = fn
      this.options = options
    } else if (typeof options === 'function') {
      this.options = {}
      this.fn = options
    } else if (!options) {
      this.options = {}
    } else {
      this.options = options
    }

    const path = this.options.path || this.name

    if (parent instanceof Collection) {
      this.path = joinUrl(parent.path, parent.key(), path)
    } else if (path.indexOf('http') === 0) {
      this.path = path
    } else {
      this.path = joinUrl(parent.path, path)
    }
  }
}
