import styled from 'styled-components'

export const MainPannelContainer = styled.div`
    @media only screen and (max-width: 1200px) {
        width: 100%;
    }
    width: 460px;
    border-radius: 24px;
    box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.16);
    background: #0c254c;
    color: white;
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
    margin: 31.5px 73px 8px 32px;
    font-family: Pretendard;
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
`
