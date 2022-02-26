import styled from 'styled-components'
import { Banner } from '@components/common'
import Top from './Top'
import Body from './Body'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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

interface Form {
    value: string
    error: boolean
    message: string
}

interface MeetForm {
    meet_title: Form
    meet_date: Form
    participants: Form
    goal: Form
}

function Meeting() {
    // redux를 사용하지 않는 것이 나을 거 같다
    const [meetForm, setMeetForm] = useState<MeetForm>({
        meet_title: { value: '', error: false, message: '' },
        meet_date: { value: '', error: false, message: '' },
        participants: { value: '', error: false, message: '' },
        goal: { value: '', error: false, message: '' },
    })
    return (
        <Container>
            <Banner />
            <OffsetPositionContainer>
                <Title>회의 정보 설정</Title>
                <Top form={meetForm} setForm={setMeetForm} />
                <Body meetForm={meetForm} setMeetForm={setMeetForm} />
            </OffsetPositionContainer>
        </Container>
    )
}

export default Meeting
