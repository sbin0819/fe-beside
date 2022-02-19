import React from 'react'
import styled from 'styled-components'
import { MainInfoTitle, StyledInput, SubTitleContainer } from './style'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 536px;
    border-radius: 24px;
    padding: 32px 40px 40px;
    box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.08);
    border: solid 1px #f1f1f1;
    background-color: #fff;
`

const GoalConatiner = styled.div`
    margin-top: 36px;
`
const AgendaContainer = styled.div`
    /* margin-top: 32px; */
    gap: 24px;
    .agenda_inputs {
        display: flex;
        /* justify-content: space-between; */
        .agenda_input {
            width: 832px;
            margin-right: 24px;
        }
        .time_input {
            width: 168px;
        }
    }
`
const ButtonContainer = styled.div`
    display: flex;
    gap: 24px;
    .cancel_btn {
        width: 320px;
    }
    .submit_btn {
    }
`

const StyledButton = styled.button`
    width: 100%;
    height: 52px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    border-radius: 12px;
    border: solid 1px #d6d6d7;
    background-color: #fff;
    margin-top: 28px;
`

const AgendaAddContainer = styled.div`
    margin: 16px 0 32px;
    padding-left: 8px;
    height: 20px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    text-align: left;
    color: rgba(60, 60, 67, 0.6);
`

const InfoSection = styled.div`
    height: 72px;
    flex-grow: 0;
    display: flex;
    align-items: center;
    border-radius: 12px;
    padding: 0 24px;
    background-color: #fbfbfb;
`

function Body(props) {
    return (
        <Container>
            <div>
                <MainInfoTitle>회의 목표 및 AGENDA</MainInfoTitle>
                <GoalConatiner>
                    <SubTitleContainer>회의 목표</SubTitleContainer>
                    <StyledInput />
                </GoalConatiner>
                <AgendaInputs />
            </div>
            <InfoSection>
                지금부터 59분안에 회의를 완료할 수 있도록 Agenda를 설정해보세요!
            </InfoSection>
            <ButtonContainer>
                <StyledButton className="cancel_btn">
                    나중에 할래요
                </StyledButton>
                <StyledButton className="submit_btn">
                    지금 바로 시작해요
                </StyledButton>
            </ButtonContainer>
        </Container>
    )
}

function AgendaInputs() {
    return (
        <>
            <SubTitleContainer style={{ marginTop: '32px' }}>
                AGENDA
            </SubTitleContainer>
            <AgendaContainer>
                <div className="agenda_inputs">
                    <StyledInput className="agenda_input" />
                    <StyledInput
                        className="time_input"
                        type="number"
                        name="duration"
                        placeholder="0"
                        // value={parseInt(
                        //     form.duration.toString().replace(/(^0+)/, '')
                        // )}
                        // onChange={onChange}
                    />
                </div>
            </AgendaContainer>
            <AgendaAddContainer>+ 액션 아이템 추가</AgendaAddContainer>
        </>
    )
}

export default Body
