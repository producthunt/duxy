import Runner from './Runner'

export default function createClient (options, fn) {
  if (!fn) {
    fn = options
    options = {}
  }

  return new Runner(options).draw(fn)
}
