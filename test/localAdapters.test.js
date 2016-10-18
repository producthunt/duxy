import { expect, spy } from './helper'
import createClient from '../src'

describe('localAdapters', () => {
  it('respects the local adapter', () => {
    const http = spy()
    const localHttp = spy()

    const client = createClient({ http }, ({ namespace, resources }) => {
      namespace('posts', { http: localHttp }, () => {
        resources('users')
      })
    })

    client.posts.users.findAll()

    expect(http).to.have.not.been.called()
    expect(localHttp).to.have.been.called()
  })
})
