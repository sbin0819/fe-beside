import styled from 'styled-components'

export const TabContainer = styled.div`
    width: 1000px;
    height: 500px;
    border-radius: 24px;
    // background-color: #fff;
    display: flex;
    flex-direction: row;
    // position: relative;
`
export const NullTabContainer = styled.div`
    width: 1000px;
    height: 500px;
    border-radius: 24px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    // position: relative;
`
export const BoxContainer = styled.div`
    border: 1px solid #f1f1f1;
    width: 390px;
    height: 200px;
    margin: 10px;
    background-color: #fff;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.08);
    position: relative;
    border-radius: 24px;
    .status-name {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .meet_title-name {
        position: absolute;
        left: 10px;
        bottom: 50px;
    }
    .last_time-name {
        position: absolute;
        left: 10px;
        bottom: 20px;
    }
    .circle {
        width: 40px;
        height: 40px;
        flex-grow: 0;
        margin: 0 auto 20px auto;
        padding: 10px;
        background-color: #0c254c;
        border-radius: 50%;
    }
    .meetCraete {
        height: 92px;
        width: 40%;
        border: 1px solid red;
        font-size: 20px;
        font-weight: 500;
        line-height: 1.6;
        text-align: center;
        margin: 0 auto;
        // position: absolute;
        // top: 50%;
        // letf: 50%;
        // transtion: translate(-50%, -50%);
    }
    .box-hover {
        border: 1px solid red;
        color: red;
    }
`
export const HoverBoxContainer = styled.div`
    border: 1px solid #f1f1f1;
    width: 390px;
    height: 200px;
    margin: 10px;
    background-color: rgba(12, 37, 76, 0.9);
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.08);
    position: relative;
    border-radius: 24px;
    color: #fff;
`
export const DataNullBox = styled.div`
    // background-color: yellow;
    margin: 0 auto;
    text-align: center;
    color: 387878b;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 500;
    .dataNullBtn {
        // width: 170px;
        height: 52px;
        flex-grow: 0;
        margin: 36px 97px 0;
        padding: 14px 40px;
        border-radius: 12px;
        background-color: #0c254c;
        font-size: 16px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: center;
        color: #fff;
    }
`
export const InputPStype = styled.p`
    flex-grow: 0;
    margin: 48px 27px 2px 32px;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.6;
    letter-spacing: normal;
    text-align: left;
    color: #000;
`
export const BoxstatusY = styled.p`
    border-radius: 8px;
    background-color: #fef4ee;
    color: #f79058;
    text-align: center;
    width: 72px;
    height: 26px;
    line-height: 26px;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 12px;
`
export const BoxstatusW = styled.p`
    border-radius: 8px;
    background-color: #ecf0f8;
    color: #3d6db8;
    text-align: center;
    width: 72px;
    height: 26px;
    line-height: 26px;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 12px;
`
export const BoxstatusE = styled.p`
    border-radius: 8px;
    background-color: #eff8f7;
    color: #5cbcad;
    text-align: center;
    width: 72px;
    height: 26px;
    line-height: 26px;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 12px;
`
export const TimeStyle = styled.p`
    flex-grow: 0;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #87878b;
    margin-left: 32px;
`
export const ImgStatus = styled.div`
    width: 36px;
    height: 36px;
    position: absolute;
    left: 32px;
    top: 32px;
    border: 1px solid yellow;
`
export const HoverImgStatus = styled.div`
    width: 36px;
    height: 36px;
    position: absolute;
    left: 32px;
    top: 32px;
    border: 1px solid yellow;
    color: #fff;
`
export const HoverDiv = styled.div`
    border: 1px solid yellow;
    width: 56px;
    height: 72px;
    font-size: 16px;
    color: #fff;
`
