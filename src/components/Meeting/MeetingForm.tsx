import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin-top: 20px;
    border: 1px solid teal;
    height: 508px;
    overflow: scroll;
`

function MeetingForm() {
    return (
        <Container>
            <div>논의내용</div>
            <div>결정된 사항</div>
            <div>액션 아이템</div>
        </Container>
    )
}

export default MeetingForm
