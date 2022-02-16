import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Banner } from '@components/common'
import { RightSection } from './styles'
import LeftPannel from './LeftPannel'
import MeetingSummary from './MeetingSummary'
import MeetingBody from './MeetingBody'
import Header from './Header'

import useSWR from 'swr'

import useMeetingActions from './useMeetingActions'

const Container = styled.div`
    position: relative;
`

const OffsetPositionContainer = styled.div`
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
    const { setMeeting } = useMeetingActions()
    const {
        data: meetData,
        error: meetError,
        isValidating: meetIsValidating,
    } = useSWR('http://125.6.40.68/api/meet/1')
    const {
        data: agendaData,
        error: agendaError,
        isValidating: agendaIsValidating,
    } = useSWR('http://125.6.40.68/api/agenda/')

    useEffect(() => {
        if (meetError || agendaError) {
        }
        if (!meetIsValidating && !agendaIsValidating) {
            // agendaData 필터 필요함
            setMeeting({ meet: meetData, agendas: agendaData })
        }
    }, [meetData, agendaData])

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
