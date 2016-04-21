import { expect } from './helper'
import createClient from '../src'

describe('paths', () => {
  it('handles unspecified paths', () => {
    const client = createClient(({ resource }) => {
      resource('users')
    })

    expect(client.users.__path).to.equal('/users')
  })

  it('handles named paths', () => {
    const client = createClient(({ resource }) => {
      resource('users', { path: 'people' })
    })

    expect(client.users.__path).to.equal('/people')
  })

  it('handles nested paths', () => {
    const client = createClient(({ resource, namespace }) => {
      namespace('api', () => {
        resource('users', { path: 'people' }, () => {
          resource('posts')
        })
      })
    })

    expect(client.api.users.posts.__path).to.equal('/api/people/{userId}/posts')
  })

  it('handles full paths', () => {
    const client = createClient(({ resource, namespace }) => {
      namespace('example', { path: 'http://example.com/' }, () => {
        resource('users')
      })
    })

    expect(client.example.users.__path).to.equal('http://example.com/users')
  })
})
