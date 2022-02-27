import styled from 'styled-components'

export const MainInfoTitle = styled.div`
    height: 24px;
    flex-grow: 0;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5;
    letter-spacing: normal;
    color: #000;
`

export const SubTitleContainer = styled.div`
    margin-bottom: 8px;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    color: #3c3c43;
`

export const StyledInput = styled.input<{ isInValid?: boolean }>`
    width: 100%;
    height: 48px;
    /* padding: 14px 565px 14px 20px; */
    padding: 20px 14px;
    border-radius: 12px;
    border: solid 1px ${({ isInValid }) => (isInValid ? 'red' : '#d6d6d7')};

    background-color: #fff;
`

export const ErrorContainer = styled.div`
    position: absolute;
    top: 53px;
    left: 10px;
    color: #e24646;
    font-size: 12px;
`
