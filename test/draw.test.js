import { expect } from './helper'
import createClient from '../src'

describe('drawing', () => {
  it('can register top level resources', () => {
    const client = createClient(({ resources }) => {
      resources('users')
      resources('posts')
    })

    expect(client.users).to.exist
    expect(client.posts).to.exist
  })

  it('can register nested resources', () => {
    const client = createClient(({ resources }) => {
      resources('users', () => {
        resources('posts')
      })
    })

    expect(client.users).to.exist
    expect(client.users.posts).to.exist
  })

  it('can register a namespace', () => {
    const client = createClient(({ resources, namespace }) => {
      namespace('api', () => {
        resources('users', () => {
          resources('posts')
        })
      })
    })

    expect(client.api.users).to.exist
    expect(client.api.users.posts).to.exist
  })

  it('can register members', () => {
    const client = createClient(({ resources, get }) => {
      resources('users', () => {
        get('latest')
      })
    })

    expect(client.users).to.exist
    expect(client.users.latest).to.exist
  })
})
