import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('login form displayed for anonymous user', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const loginTitle = component.getByText('Log to application')
    expect(loginTitle).toBeDefined()

    const input = component.container.querySelector('input')
    expect(input).toBeDefined()

    const blogsTitle = component.queryByText('user blogs')
    expect(blogsTitle).toBeNull()
  })

  test('blogs displayed for authenticated user', async () => {
    const user = {
      username: 'unclebob',
      token: '1231231214',
      name: 'Robert C. Martin',
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('user blogs')
    )

    const blog1 = component.getByText('First class tests, Robert C. Martin')
    expect(blog1).toBeDefined()

    const blog2 = component.getByText('Type wars, Robert C. Martin')
    expect(blog2).toBeDefined()

    const blog3 = component.getByText('TDD harms architecture, Robert C. Martin')
    expect(blog3).toBeDefined()

    const logout = component.queryByText('logout')
    expect(logout).toBeDefined()

    const newBlog = component.queryByText('new blog')
    expect(newBlog).toBeDefined()
  })
})
