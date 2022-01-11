import React from 'react'
import { render, screen } from '@store/test-utils'
import UserCard from './UserCard'

describe('Render UserCard', () => {
    const setup = () => {
        render(<UserCard />)
    }
    it('<UserCard/>', () => {
        setup()
        expect(screen.getByText(/Redux/i)).toBeTruthy()
    })
})
