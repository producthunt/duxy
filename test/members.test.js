import { expect, spy } from './helper'
import createClient from '../src'

describe('members', () => {
  it('are not affected by only', () => {
    const http = spy()

    const client = createClient({ http }, ({ resources, get }) => {
      resources('posts', { only: ['findOne'] }, () => {
        get('latest')
      })
    })

    client.posts.latest({ foo: true })

    expect(http).to.have.been.called.with({
      method: 'GET',
      url: '/posts/latest',
      body: undefined,
      query: { foo: true }
    })
  })

  it('supports path option', () => {
    const http = spy()

    const client = createClient({ http }, ({ resources, get }) => {
      resources('posts', { only: ['findOne'] }, () => {
        get('edit', { path: '{id}/edit' })
      })
    })

    client.posts.edit({ id: 1, foo: true })

    expect(http).to.have.been.called.with({
      method: 'GET',
      url: '/posts/1/edit',
      body: undefined,
      query: { id: 1, foo: true }
    })
  })

  describe('readers', () => {
    it('call the the http adapter with correct params', () => {
      const http = spy()

      const client = createClient({ http }, ({ resources, get }) => {
        resources('posts', () => {
          get('latest')
        })
      })

      client.posts.latest({ foo: true })

      expect(http).to.have.been.called.with({
        method: 'GET',
        url: '/posts/latest',
        body: undefined,
        query: { foo: true }
      })
    })
  })

  describe('writers', () => {
    it('call the the http adapter with correct params', () => {
      const http = spy()

      const client = createClient({ http }, ({ resources, post }) => {
        resources('posts', () => {
          post('latest')
        })
      })

      client.posts.latest({ body: true }, { query: true })

      expect(http).to.have.been.called.with({
        method: 'POST',
        url: '/posts/latest',
        query: { query: true },
        body: { body: true }
      })
    })
  })
})
