import { expect } from './helper'
import createClient from '../src'

describe('drawing', () => {
  it('can register top level resources', () => {
    const client = createClient(({ resource }) => {
      resource('users')
      resource('posts')
    })

    expect(client.users).to.exist
    expect(client.posts).to.exist
  })

  it('can register nested resources', () => {
    const client = createClient(({ resource }) => {
      resource('users', () => {
        resource('posts')
      })
    })

    expect(client.users).to.exist
    expect(client.users.posts).to.exist
  })

  it('can register a namespace', () => {
    const client = createClient(({ resource, namespace }) => {
      namespace('api', () => {
        resource('users', () => {
          resource('posts')
        })
      })
    })

    expect(client.api.users).to.exist
    expect(client.api.users.posts).to.exist
  })

  it('can register members', () => {
    const client = createClient(({ resource, get }) => {
      resource('users', () => {
        get('latest')
      })
    })

    expect(client.users).to.exist
    expect(client.users.latest).to.exist
  })
})
