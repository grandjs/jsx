import http from 'http'
import View from '../src'
import request from 'supertest'
import { expect } from 'chai'

const view = new View('test')

describe('grandjs/jsx', () => {
  const component = view.importComponent('hello.jsx')
  const api = request(createApp(component))
  
  it ('should import component file correctly', () => {
    expect(component)
      .to.be.equal('module.exports = () => (<div>Hello World</div>)')
  })

  it ('should render component correctly', async () => {
    const rendered = await view.renderToString(component, {})
    expect(rendered).to.be.equal('<div>Hello World</div>')
  })

  it ('should use the default view dir', async () => {
    const view = new View() // 'views'
    expect(view).to.be.instanceof(View)
  })

  it('should the server respond correctly', (done) => {
      api
      .get('/')
      .expect('Content-Type', /html/)
      .expect(/Hello World/)
      .expect(200, done)
  })
})

function createApp (component) {
  const server = http.createServer(async (request, response) => {
    const html = await view.renderToString(component, {})
    response.statusCode = 200
    response.setHeader('content-type', 'text/html')
    response.end(html)
  })

  return server.listen()
}
