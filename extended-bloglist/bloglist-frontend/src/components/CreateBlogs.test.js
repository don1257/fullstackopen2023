import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render, screen} from '@testing-library/react'
import CreateBlogs from "./CreateBlogs";

// Limited Test
test('renders content', () => {
    const token = jest.fn()

    render(<CreateBlogs token={token} />)
})
