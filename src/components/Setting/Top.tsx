import React from 'react'
import styled from 'styled-components'
import { MainInfoTitle, StyledInput, SubTitleContainer } from './style'

const Container = styled.div`
    height: 316px;
    border-radius: 24px;
    margin: 15px 0 24px;
    padding: 32px 40px 40px;
    box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.08);
    border: solid 1px #f1f1f1;
    background-color: #fff;
`

const TitleFormContainer = styled.div`
    margin-top: 36px;
    margin-bottom: 32px;
    .meet_info_title_inputs {
        display: flex;
        justify-content: space-between;
        .title_input {
            width: 714px;
        }
        .date_input {
            width: 322px;
        }
    }
`

function Top() {
    return (
        <Container>
            <MainInfoTitle>회의 정보</MainInfoTitle>
            <TitleFormContainer>
                <SubTitleContainer>회의 제목</SubTitleContainer>
                <div
                    className="meet_info_title_inputs"
                    style={{ display: 'flex' }}
                >
                    <StyledInput className="title_input" />
                    <StyledInput className="date_input" />
                </div>
            </TitleFormContainer>
            <div className="mee_users">
                <SubTitleContainer>회의 참석자</SubTitleContainer>
                <StyledInput />
            </div>
        </Container>
    )
}

export default Top
