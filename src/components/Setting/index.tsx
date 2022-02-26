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

function Meeting() {
    const [topValidFields, setTopValidFields] = useState({
        meet_title: { error: false, message: '' },
        meet_date: { error: false, message: '' },
        participants: { error: false, message: '' },
    })
    return (
        <Container>
            <Banner />
            <OffsetPositionContainer>
                <Title>회의 정보 설정</Title>
                <Top />
                <Body />
            </OffsetPositionContainer>
        </Container>
    )
}

export default Meeting
