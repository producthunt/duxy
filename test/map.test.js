import { expect, spy } from './helper'
import createClient from '../src'

describe('map', () => {
  it('calls the given fn with body params and the http adapter', () => {
    const http = Symbol('http')
    const call = spy()

    const client = createClient({ http }, ({ map }) => {
      map('custom', call)
    })

    const body = { body: true }
    const params = { params: true }

    client.custom(body, params)

    expect(call).to.have.been.called.with(body, params, http)
  })
})
