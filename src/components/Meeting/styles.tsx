import styled from 'styled-components'

export const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    line-height: 1.5;
    font-family: Pretendard;
    margin-bottom: 24px;

    .meeting_title {
        font-size: 28px;
        font-weight: bold;
        color: #000;
    }
    .meeting_control {
        display: flex;
        align-items: center;
        gap: 32px;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.5;
        color: #000;
        .meeting_control_info {
            color: #87878b;
            cursor: pointer;
        }
        .meeting_control_power {
            display: flex;
            align-self: center;
            cursor: pointer;
            svg {
                padding-right: 4px;
            }
        }
    }
`

export const RightSection = styled.div`
    @media only screen and (max-width: 1200px) {
        margin-left: 0;
        margin-top: 50px;
    }
    margin-left: 24px;
`
