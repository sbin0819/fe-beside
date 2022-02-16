import styled from 'styled-components'

export const MainPannelContainer = styled.div`
    width: 460px;
    border-radius: 24px;
    box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.16);
    background: #0c254c;
    color: white;
    display: flex;
    flex-direction: column;
`

export const MainPannelTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 94px;
    border-bottom: 1px solid #fff;
    padding: 0 32px;
    .main_pannel_top_desc {
        font-family: Pretendard;
        font-size: 20px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.4;
        letter-spacing: normal;
        color: #fff;
    }
    .main_pannel_top_desc {
        padding-right: 4px;
    }
`

export const MainPannelBody = styled.div`
    padding: 31.5px 32px;
    font-family: Pretendard;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .main_pannel_top {
        padding-right: 50px;
        .main_pannel_body_progress {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            padding: 8px 12px;
            border-radius: 12px;
            background: #384c6c;
        }
        .main_pannel_body_sub_title {
            margin-top: 24px;
            font-size: 32px;
            font-weight: 500;
            line-height: 1.31;
            color: #fff;
        }
    }

    .main_pannel_toast {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 360px;
        height: 72px;
        border-radius: 24px;
        box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.16);
        background: rgba(0, 0, 0, 0.4);
        font-family: Pretendard;
        font-size: 20px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.6;
        letter-spacing: normal;
        text-align: left;
        color: #fff;
    }
`
