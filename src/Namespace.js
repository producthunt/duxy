import Collection from './Collection'

export default class Namespace extends Collection {
  constructor (parent, name, options, fn) {
    super(parent, name, options, fn)
    this.finders = []
  }

  key () {
    return ''
  }
}
