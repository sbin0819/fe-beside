import styled from 'styled-components'

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.34);
    z-index: 5;
`

export const ModalContainer = styled.div`
    width: 954px;
    height: 760px;
    flex-grow: 0;
    padding: 32px 36px;
    border-radius: 24px;
    box-shadow: 4px 4px 32px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 32px 36px;
`

export const TopContainer = styled.div`
    font-family: Pretendard;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;

    .top_title {
        font-size: 32px;
        line-height: 1.31;
        color: #000;
    }
    .top_description {
        font-size: 14px;
        line-height: 1.43;
        color: #87878b;
    }
`
export const BodyContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 36px;
`
export const CheckListContainer = styled.div`
    height: 503px;
    flex-grow: 0;
    border-radius: 12px;
    font-family: Pretendard;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    .checklist_title {
        height: 20px;
        flex-grow: 0;
        font-family: Pretendard;
        font-size: 14px;
        font-weight: bold;
        line-height: 1.43;
        color: #000;
    }
    .checklist {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        gap: 12px;

        label {
            display: flex;
            align-items: center;
            height: 20px;
            font-size: 14px;
            line-height: 1.43;
            letter-spacing: normal;
            color: #000;
            input[type='checkbox'] {
                margin-right: 9px;
                width: 14px;
                height: 14px;
                padding: 3px;
            }
        }
    }
`
export const ResultContainer = styled.div`
    width: 429px;
    border-radius: 12px;
    background-color: #fbfbfb;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    padding: 28px 41px;
`

export const CheckListReslutBeforeContainer = styled.div`
    .result_info {
        margin-top: 206px;
        margin-bottom: 28px;
        height: 20px;
        font-family: Pretendard;
        font-size: 14px;
        text-align: center;
        color: #3c3c43;
    }
    .result_btn {
        display: flex;
        justify-content: center;
        margin: 0 auto;
        width: 212px;
        height: 44px;
        flex-grow: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        background-color: #0c254c;
        font-size: 16px;
        line-height: 1.5;
        color: #fff;
        cursor: pointer;
    }
`

export const CheckListReslutAfterContainer = styled.div`
    font-family: Pretendard;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    .checklist_after_header {
        text-align: center;
        letter-spacing: normal;
        color: #3c3c43;
        .checklist_after_header_title {
            font-family: Pretendard;
            font-size: 16px;
            color: #3c3c43;
        }
        .checklist_after_header_description {
            font-size: 60px;
            font-weight: 800;
            color: #000;
        }
    }

    .checklist_after_footer {
        font-size: 14px;
        font-style: normal;
        line-height: 1.43;
        text-align: center;
        color: #000;
    }
`

export const ChartContainer = styled.div`
    width: 300px;
    height: 280px;
    background-color: rgba(255, 0, 0, 0.04);
    margin: 11px auto 12px;
`

export const FooterContainer = styled.div`
    margin-top: 32px;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    button {
        cursor: pointer;
        width: 120px;
        flex-grow: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        border: solid 1px #d6d6d7;
        background-color: #fff;
    }
    .success-btn {
        color: #fff;
        background-color: #0c254c;
        cursor: default;
    }
`
