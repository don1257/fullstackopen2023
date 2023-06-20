import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render, screen} from '@testing-library/react'
import Blog from "./Blog";

test('renders content', () => {
    const note = {
        title: 'title',
        author: 'author',
        url: 'www',
        likes: 3
    }

    const component = render(<Blog blog={note} />)

    const elementTitle = component.getByText('title')
    const elementAuthor = component.getByText('author')
    expect(elementTitle).toBeInTheDocument()
    expect(elementAuthor).toBeInTheDocument()

    const elementURL = component.container.querySelector('.toggleChild')
    const computedStyle = window.getComputedStyle(elementURL);
    expect(computedStyle.display).toBe('none');
})

test('renders additional content after button click', () => {
    const note = {
        title: 'title',
        author: 'author123',
        url: 'www',
        likes: 3
    }

    const container = render(<Blog blog={note} />)
    const showButton = container.getByText('Show')
    fireEvent.click(showButton)

    const urlText = container.getByText('www')
    const numberText = container.getByText('3')

    expect(urlText).toBeDefined()
    expect(numberText).toBeDefined()
})

test('renders additional content after button click', () => {
    const note = {
        title: 'title',
        author: 'author123',
        url: 'www',
        likes: 3
    }

    const mockUpVoteClick = jest.fn();

    const container = render(<Blog blog={note} upVote={mockUpVoteClick}/>)
    const likeButton = container.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockUpVoteClick.mock.calls).toHaveLength(2)
})
