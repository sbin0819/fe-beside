import React from 'react'
import styled from 'styled-components'
import { Banner, Svg } from '@components/common'
import { Power, powerViewBox } from '@svgs/Power'
import { TopContainer, RightSection } from './styles'
import MainPannel from './MainPannel'
import MeetingSummary from './MeetingSummary'
import MeetingForm from './MeetingForm'

const Container = styled.div`
    position: relative;
`

const InnerContainer = styled.div`
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
`

const BodyContainer = styled.div`
    display: flex;
    margin: 0 auto;
    height: 600px;
    @media only screen and (max-width: 1200px) {
        flex-direction: column;
    }
`

function Meeting() {
    return (
        <Container>
            <Banner />
            <InnerContainer>
                <TopContainer>
                    <div className="meeting_title">회의 제목</div>
                    <div className="meeting_control">
                        <div className="meeting_control_info">회의정보</div>
                        <div className="meeting_control_power">
                            <div>
                                <Svg
                                    viewBox={powerViewBox}
                                    width={'20'}
                                    height={'20'}
                                >
                                    <Power />
                                </Svg>
                            </div>
                            <div>회의종료</div>
                        </div>
                    </div>
                </TopContainer>
                <BodyContainer>
                    <MainPannel />
                    <RightSection>
                        <MeetingSummary />
                        <MeetingForm />
                    </RightSection>
                </BodyContainer>
            </InnerContainer>
        </Container>
    )
}

export default Meeting
