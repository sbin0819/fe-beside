import React from 'react'
import { Banner, Svg } from '@components/common'
import styled from 'styled-components'
import Header from './Header'
import Body from './Body'
import { meetSWR } from '@api/meet'

const Container = styled.div`
    position: relative;
`

function Minutes() {
    let id = 4
    const { meetData } = meetSWR(id)

    React.useEffect(() => {
        console.log('meet --', meetData)
    }, [])
    return (
        <Container>
            <div>
                <Banner />
                <Header />
                <Body />
            </div>
        </Container>
    )
}

export default Minutes
