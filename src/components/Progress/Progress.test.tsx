import React from 'react'
import { render, screen } from '@testing-library/react'
import Progress from './'

describe('Render UserCard', () => {
    const setup = () => {
        render(<Progress />)
    }
    it('<UserCard/>', () => {
        setup()
        expect(screen.getByText(/임시 미팅 진행 페이지/i)).toBeInTheDocument()
    })
})
