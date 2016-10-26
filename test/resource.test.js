import { expect, spy } from './helper'
import createClient from '../src'

describe('resource', () => {
  describe('findOne', () => {
    it('call the the http adapter with correct params', () => {
      const http = spy()

      const client = createClient({ http }, ({ resource, get }) => {
        resource('subscription')
      })

      client.subscription.findOne({ query: true })

      expect(http).to.have.been.called.with({
        method: 'GET',
        url: '/subscription/',
        body: undefined,
        query: { query: true }
      })
    })

    it('throws if the method is not allowed', () => {
      const client = createClient(({ resource, get }) => {
        resource('subscription', { only: [] })
      })

      expect(() => {
        client.subscription.findOne()
      }).to.throw('`findOne()` is not allowed on this resource')
    })
  })

  describe('create', () => {
    it('call the the http adapter with correct params', () => {
      const http = spy()

      const client = createClient({ http }, ({ resource }) => {
        resource('subscription')
      })

      client.subscription.create({ body: true }, { query: true })

      expect(http).to.have.been.called.with({
        method: 'POST',
        url: '/subscription/',
        body: { body: true },
        query: { query: true }
      })
    })

    it('throws if the method is not allowed', () => {
      const client = createClient(({ resource, get }) => {
        resource('subscription', { only: ['findOne'] })
      })

      expect(() => {
        client.subscription.create()
      }).to.throw('`create()` is not allowed on this resource')
    })
  })

  describe('update', () => {
    it('call the the http adapter with correct params', () => {
      const http = spy()

      const client = createClient({ http }, ({ resource }) => {
        resource('subscription')
      })

      client.subscription.update({ body: true }, { query: true })

      expect(http).to.have.been.called.with({
        method: 'PUT',
        url: '/subscription/',
        body: { body: true },
        query: { query: true }
      })
    })

    it('throws if the method is not allowed', () => {
      const client = createClient(({ resource, get }) => {
        resource('subscription', { only: ['findOne'] })
      })

      expect(() => {
        client.subscription.update()
      }).to.throw('`update()` is not allowed on this resource')
    })
  })

  describe('delete', () => {
    it('call the the http adapter with correct params', () => {
      const http = spy()

      const client = createClient({ http }, ({ resource }) => {
        resource('subscription')
      })

      client.subscription.delete({ id: 1, body: true }, { query: true })

      expect(http).to.have.been.called.with({
        method: 'DELETE',
        url: '/subscription/',
        body: { body: true, id: 1 },
        query: { query: true }
      })
    })

    it('throws if the method is not allowed', () => {
      const client = createClient(({ resource, get }) => {
        resource('subscription', { only: ['findOne'] })
      })

      expect(() => {
        client.subscription.delete()
      }).to.throw('`delete()` is not allowed on this resource')
    })
  })
})
