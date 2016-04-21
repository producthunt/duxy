import { expect, spy } from './helper'
import createClient from '../src'

describe('localAdapters', () => {
  it('respects the local adapter', () => {
    const http = spy()
    const localHttp = spy()

    const client = createClient({ http }, ({ namespace, resource }) => {
      namespace('posts', { http: localHttp }, () => {
        resource('users')
      })
    })

    client.posts.users.findAll()

    expect(http).to.have.not.been.called()
    expect(localHttp).to.have.been.called()
  })
})
