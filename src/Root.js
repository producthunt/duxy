import Runnable from './Runnable'

export default class Root extends Runnable {
  constructor (dsl, http) {
    super()
    this.dsl = dsl
    this.options = { http }
    this.finders = []
    this.path = ''
  }

  run (fn) {
    fn(this.dsl)
  }

  draw () {
    const tree = this.create()
    return super.draw(tree)
  }
}
