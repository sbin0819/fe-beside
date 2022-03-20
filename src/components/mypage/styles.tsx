import styled from 'styled-components'

export const TabContainer = styled.div`
    width: 1140px;
    height: 704px;
    border-radius: 24px;
    // background-color: #fff;
    display: flex;
    flex-direction: row;

    // position: relative;
`
export const NullTabContainer = styled.div`
    width: 1140px;
    height: 704px;
    border-radius: 24px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.08);
    border: solid 1px #f1f1f1;
    margin-bottom: 126px;
    // position: relative;
`
export const ListBoxContainer = styled.div`
    width: 1140px;
    height: 704px;

    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(364px, 24px));
    // grid-template-columns: 1fr 1fr 1fr;
    align-content: start;

    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-evenly;
    // flex: 1 1 40%;
`
export const BoxContainer = styled.div`
    border: 1px solid #f1f1f1;
    width: 364px;
    height: 200px;
    // margin: 10px;
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
        // border: 1px solid red;
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
    .box-class {
        width: 390px;
        height: 200px;
    }
    // .HoverBoxContainer {
    //     border: 1px solid #f1f1f1;
    //     width: 390px;
    //     height: 200px;
    //     margin: 10px;
    //     background-color: rgba(12, 37, 76, 1);
    //     box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.08);
    //     position: relative;
    //     border-radius: 24px;
    //     color: #fff;
    //     opacity: 1;
    //     position: absolute;
    //     left: 0;
    //     top: 0;
    //     transition: all 0.3s ease-in-out;
    // }
    // .box-class:hover .HoverBoxContainer {
    //     opacity: 0;
    // }
`
export const HoverBoxContainer = styled.div`
    border: 1px solid #f1f1f1;
    width: 364px;
    height: 200px;
    // margin: 10px;
    background-color: rgba(12, 37, 76, 0.9);
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.08);
    // position: relative;
    border-radius: 24px;
    color: #fff;
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    transition: all 0.3s ease-in-out;
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
export const BoxstatusY = styled.div`
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
export const BoxstatusW = styled.div`
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
export const BoxstatusE = styled.div`
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
export const BoxstatusX = styled.div`
    border-radius: 8px;
    background-color: #f1f1f1;
    color: #c0c0c2;
    text-align: center;
    width: 72px;
    height: 26px;
    line-height: 26px;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 12px;
`
export const TimeStyle = styled.div`
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
    width: 66px;
    height: 36px;
    position: absolute;
    left: 32px;
    top: 32px;
    // border: 1px solid yellow;
`

export const HoverImgStatus = styled.div`
    width: 66px;
    height: 36px;
    // position: absolute;
    // left: 32px;
    // top: 32px;
    // border: 1px solid yellow;
    color: #fff;
    font-align: center;
`
export const HoverDiv = styled.div`
    position: absolute;
    left: 106px;
    top: 70px;
    // width: 66px;
    // height: 72px;
    font-size: 16px;
    color: #fff;
    font-align: center;
    cursor: pointer;
    p {
        margin-top: 10px;
        margin-left: -5px;
    }
`
export const DeleteHoverDiv = styled.div`
    position: absolute;
    right: 106px;
    top: 70px;
    // width: 66px;
    // height: 72px;
    font-size: 16px;
    color: #fff;
    font-align: center;
    cursor: pointer;
    p {
        margin-top: 10px;
        margin-left: -5px;
    }
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
