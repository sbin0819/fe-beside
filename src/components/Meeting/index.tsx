import React from 'react'
import styled from 'styled-components'
import { Banner } from '@components/common'
import { RightSection } from './styles'
import LeftPannel from './LeftPannel'
import MeetingSummary from './MeetingSummary'
import MeetingBody from './MeetingBody'
import Header from './Header'

const Container = styled.div`
    position: relative;
`

const OffsetPositionContainer = styled.div`
    /* position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%); */
    position: relative;
    top: -160px;
    width: 1100px;
    margin: 0 auto;
`

const BodyContainer = styled.div`
    display: flex;
    margin: 0 auto;
    height: 600px;
`

function Meeting() {
    return (
        <Container>
            <Banner />
            <OffsetPositionContainer>
                <Header />
                <BodyContainer>
                    <LeftPannel />
                    <RightSection>
                        <MeetingSummary />
                        <MeetingBody />
                    </RightSection>
                </BodyContainer>
            </OffsetPositionContainer>
        </Container>
    )
}

export default Meeting
