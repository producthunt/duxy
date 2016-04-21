import joinUrl from 'url-join'

export default function createEndpoint (member, { allowed, basePath, http }) {
  const { method, call, force, name, path } = member

  return function (body, params) {
    // NOTE(vesln): registered with `map` - invoke directly
    if (call) {
      return call(body, params, http)
    }

    // NOTE(vesln): check if this endpoint is allowed
    if (!force && allowed && !~allowed.indexOf(name)) {
      throw new Error(`\`${name}()\` is not allowed on this resource`)
    }

    // NOTE(vesln): if GET ignore the body
    if (method === 'GET') {
      params = body
      body = undefined
    }

    params = params || {}

    // NOTE(vesln): populate the placeholders
    const url = joinUrl(basePath, path).replace(/{([^{}]*)}/g, (placeholder, key) => {
      const replace = body ? body[key] || params[key] : params[key]

      if (!replace) {
        throw new Error(`Missing value for placeholder "${placeholder}"`)
      }

      return String(replace)
    })

    return http({ method, url, body, query: params })
  }
}
