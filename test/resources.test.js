import { expect, spy } from './helper'
import createClient from '../src'

describe('resources', () => {
  describe('findOne', () => {
    it('call the the http adapter with correct params', () => {
      const http = spy()

      const client = createClient({ http }, ({ resources, get }) => {
        resources('posts')
      })

      client.posts.findOne({ id: 1, query: true })

      expect(http).to.have.been.called.with({
        method: 'GET',
        url: '/posts/1',
        body: undefined,
        query: { query: true, id: 1 }
      })
    })

    it('throws if the method is not allowed', () => {
      const client = createClient(({ resources, get }) => {
        resources('posts', { only: ['findAll'] })
      })

      expect(() => {
        client.posts.findOne()
      }).to.throw('`findOne()` is not allowed on this resource')
    })
  })

  describe('findAll', () => {
    it('call the the http adapter with correct params', () => {
      const http = spy()

      const client = createClient({ http }, ({ resources, get }) => {
        resources('posts')
      })

      client.posts.findAll({ query: true })

      expect(http).to.have.been.called.with({
        method: 'GET',
        url: '/posts/',
        body: undefined,
        query: { query: true }
      })
    })

    it('throws if the method is not allowed', () => {
      const client = createClient(({ resources, get }) => {
        resources('posts', { only: ['findOne'] })
      })

      expect(() => {
        client.posts.findAll()
      }).to.throw('`findAll()` is not allowed on this resource')
    })
  })

  describe('create', () => {
    it('call the the http adapter with correct params', () => {
      const http = spy()

      const client = createClient({ http }, ({ resources }) => {
        resources('posts')
      })

      client.posts.create({ body: true }, { query: true })

      expect(http).to.have.been.called.with({
        method: 'POST',
        url: '/posts/',
        body: { body: true },
        query: { query: true }
      })
    })

    it('throws if the method is not allowed', () => {
      const client = createClient(({ resources, get }) => {
        resources('posts', { only: ['findOne'] })
      })

      expect(() => {
        client.posts.create()
      }).to.throw('`create()` is not allowed on this resource')
    })
  })

  describe('update', () => {
    it('call the the http adapter with correct params', () => {
      const http = spy()

      const client = createClient({ http }, ({ resources }) => {
        resources('posts')
      })

      client.posts.update({ id: 1, body: true }, { query: true })

      expect(http).to.have.been.called.with({
        method: 'PUT',
        url: '/posts/1',
        body: { body: true, id: 1 },
        query: { query: true }
      })
    })

    it('throws if the method is not allowed', () => {
      const client = createClient(({ resources, get }) => {
        resources('posts', { only: ['findOne'] })
      })

      expect(() => {
        client.posts.update()
      }).to.throw('`update()` is not allowed on this resource')
    })
  })

  describe('delete', () => {
    it('call the the http adapter with correct params', () => {
      const http = spy()

      const client = createClient({ http }, ({ resources }) => {
        resources('posts')
      })

      client.posts.delete({ id: 1, body: true }, { query: true })

      expect(http).to.have.been.called.with({
        method: 'DELETE',
        url: '/posts/1',
        body: { body: true, id: 1 },
        query: { query: true }
      })
    })

    it('throws if the method is not allowed', () => {
      const client = createClient(({ resources, get }) => {
        resources('posts', { only: ['findOne'] })
      })

      expect(() => {
        client.posts.delete()
      }).to.throw('`delete()` is not allowed on this resource')
    })
  })
})
