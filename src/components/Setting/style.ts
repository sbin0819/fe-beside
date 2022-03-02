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

export const SettingInputContinaer = styled.div<{ isValue?: boolean }>`
    position: relative;
    input[type='date'] {
        color: ${({ isValue }) => (isValue ? 'inherit' : '#c0c0c2')};
    }
    input[type='date']::-webkit-inner-spin-button,
    input[type='date']::-webkit-calendar-picker-indicator {
        background: transparent;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
    }
`

export const StyledInput = styled.input<{
    isInValid?: boolean
    isFocus?: boolean
}>`
    width: 100%;
    height: 48px;
    /* padding: 14px 565px 14px 20px; */
    padding: 20px 14px;
    border-radius: 12px;
    border: solid 1px
        ${({ isInValid, isFocus }) =>
            isInValid ? 'red' : isFocus ? '#748298' : '#d6d6d7'};

    background-color: #fff;
`

export const StyledDateInput = styled.input<{
    isInValid?: boolean
    isFocus?: boolean
}>`
    width: 100%;
    height: 48px;
    /* padding: 14px 565px 14px 20px; */
    padding: 20px 14px;
    border-radius: 12px;
    border: solid 1px
        ${({ isInValid, isFocus }) =>
            isInValid ? 'red' : isFocus ? '#748298' : '#d6d6d7'};

    background-color: #fff;
`

export const InputInfoContainer = styled.div<{ isInValid?: boolean }>`
    position: absolute;
    top: 53px;
    left: 10px;
    color: ${({ isInValid }) => (isInValid ? '#e24646' : '#748298')};
    font-size: 12px;
`
