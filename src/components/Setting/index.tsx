import styled from 'styled-components'
import { Banner } from '@components/common'
import Top from './Top'
import Body from './Body'
import useSetting from './useSetting'
import { useState } from 'react'

const Container = styled.div`
    position: relative;
`

const OffsetPositionContainer = styled.div`
    position: relative;
    top: -160px;
    width: 1140px;
    margin: 0 auto;
`
const Title = styled.div`
    height: 28px;
    flex-grow: 0;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: normal;
    color: #000;
    position: relative;
`

function Meeting() {
    const { meetForm, setMeetForm, agendaForms, setAgendagendaForms } =
        useSetting()
    return (
        <Container>
            <Banner />
            <OffsetPositionContainer>
                <Title>회의 정보 설정</Title>
                <Top form={meetForm} setForm={setMeetForm} />
                <Body
                    meetForm={meetForm}
                    agendaForms={agendaForms}
                    setMeetForm={setMeetForm}
                    setAgendagendaForms={setAgendagendaForms}
                />
            </OffsetPositionContainer>
        </Container>
    )
}

export default Meeting
