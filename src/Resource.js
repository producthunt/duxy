import Collection from './Collection'

export default class Resource extends Collection {
  constructor (parent, name, options, fn) {
    super(parent, name, options, fn)

    this.finders = [
      { name: 'findOne', method: 'GET', path: null },
      { name: 'create', method: 'POST', path: null },
      { name: 'update', method: 'PUT', path: null },
      { name: 'delete', method: 'DELETE', path: null }
    ]
  }
}
