import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  const blog = {
    title: 'My test blog',
    author: 'John Doe',
    likes: 7,
  }
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
  })

  test('title div contains blog title', () => {
    const titleBlock = component.container.querySelector('.title')
    expect(titleBlock).toHaveTextContent(
      'My test blog'
    )
  })

  test('title div contains blog author', () => {
    const titleBlock = component.container.querySelector('.title')
    expect(titleBlock).toHaveTextContent(
      'John Doe'
    )
  })

  test('content div contains amount of likes', () => {
    const titleBlock = component.container.querySelector('.content')
    expect(titleBlock).toHaveTextContent(
      'blog has 7 likes'
    )
  })

  test('clicking like button twice calls handler twice', async () => {
    const btn = component.getByText('like')
    fireEvent.click(btn)
    fireEvent.click(btn)
    expect(mockHandler.mock.calls.length).toBe(2)
  })

})