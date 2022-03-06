import React from 'react'
import { Banner, Svg } from '@components/common'
import styled from 'styled-components'
import Header from './Header'

const Container = styled.div`
    position: relative;
`

function Minutes() {
    return (
        <Container>
            <div>
                <Banner />
                <Header />
            </div>
        </Container>
    )
}

export default Minutes
