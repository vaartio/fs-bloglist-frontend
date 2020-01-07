import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'My test blog',
    author: 'John Doe',
    url: 'http://localhost',
    likes: 7,
    user: {
      name: 'Ozzie'
    }
  }
  const onLikeMockHandler = jest.fn()
  const onRemoveMockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} onLikeClicked={onLikeMockHandler} onRemoveClicked={onRemoveMockHandler} removeVisible={false} />
    )
  })

  test('by default only title and author are visible', () => {
    const element = component.getByText('My test blog, John Doe')
    expect(element).toHaveTextContent(
      'My test blog'
    )
    expect(element).toHaveTextContent(
      'John Doe'
    )
    expect(element).not.toHaveTextContent(
      'http://localhost'
    )
    expect(element).not.toHaveTextContent(
      '7 likes'
    )
    expect(element).not.toHaveTextContent(
      'added by Ozzie'
    )
  })

  test('clicking a blog reveals all fields', () => {
    const collapsedElement = component.getByText('My test blog, John Doe')
    fireEvent.click(collapsedElement)
    const element = component.container.querySelector('.blog')
    expect(element).toHaveTextContent(
      'My test blog'
    )
    expect(element).toHaveTextContent(
      'John Doe'
    )
    expect(element).toHaveTextContent(
      'http://localhost'
    )
    expect(element).toHaveTextContent(
      '7 likes'
    )
    expect(element).toHaveTextContent(
      'added by Ozzie'
    )
    expect(onLikeMockHandler.mock.calls.length).toBe(0)
    expect(onRemoveMockHandler.mock.calls.length).toBe(0)
  })

  /*test('title div contains blog author', () => {
    const dom = component.getByText('My test blog')
    expect(dom).toHaveTextContent(
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
  })*/

})