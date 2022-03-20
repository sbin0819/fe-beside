import React from 'react'
import { Banner, Svg } from '@components/common'
import styled from 'styled-components'
import Header from './Header'
import Body from './Body'
import { meetSWR } from '@api/meet'

const Container = styled.div`
    position: relative;
`

function Edit() {
    return (
        <Container>
            <div>
                <Banner />
                {/* <Header /> */}
                <Body />
            </div>
        </Container>
    )
}

export default Edit
