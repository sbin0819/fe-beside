import styled from 'styled-components'

export const BoxContainer = styled.div`
    position: absolute;
    transform: translateX(-50%);
    width: 1140px;
    left: 50%;
    top: 267px;
`
export const TopBox = styled.div`
    width: 1140px;
    height: 180px;
    flex-grow: 0;
    // margin: 39px 390px 48px;
    padding: 28px 75px 20px 32px;
    border-radius: 24px;
    box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.08);
    background-color: #0c254c;
`
export const TopBoxColLeft = styled.div`
    position: absolute;
    top: 28px;
    // width: 187px;
    height: 24px;
    flex-grow: 0;
    // margin: 0 169px 16px 0;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #748298;
    .top-box-title {
        font-family: Pretendard;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #748298;
    }
    .top-box-emoji {
        width: 72px;
        hegiht: 72px;
        font-size: 50px;
        margin-top: 22px;
        float: left;
    }
    .top-box-titme {
        float: left;
        margin-top: 16px;
        .big-time {
            // float: left;
            font-size: 48px;
            font-weight: 800;
            line-height: normal;
            color: #fff;
        }
        .small-time {
            font-size: 32px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.31;
            letter-spacing: normal;
            text-align: left;
            color: #748298;
        }
    }
    .top-message {
        margin-top: 10px;
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        text-align: left;
        color: #5cbcad;
    }
`
export const TopBoxColRight = styled.div`
    position: absolute;
    top: 28px;
    // width: 187px;
    height: 24px;
    flex-grow: 0;
    left: 388px;
    .top-box-title {
        font-family: Pretendard;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #748298;
    }
    .top-box-content {
        margin-top: 16px;
        font-size: 32px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.31;
        letter-spacing: normal;
        text-align: left;
        color: #fff;
    }
`
export const AgendaBox = styled.div`
    width: 1140px;
    height: 863px;
    margin-top: 48px;
    margin-bottom: 48px;
    padding: 0 0 60px;
    border-radius: 24px;
    box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.08);
    border: solid 1px #f1f1f1;
    background-color: #fff;
`
export const AgendaId = styled.div`
    width: 77px;
    height: 24px;
    line-height: 1.5;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    color: #fff;
    width: 101px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    margin: 0 34px 2px 0;
    padding: 8px 12px;
    border-radius: 12px;
    background-color: #748298;
}
`
export const AgendaTitle = styled.div`
    display: flex;
    flex-direction: rows;
    padding: 32px 28px;
    .agenda-title {
        font-size: 32px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.31;
        letter-spacing: normal;
        text-align: left;
        color: #3c3c43;
    }
`
export const AgendaBodyGoodTime = styled.div`
    width: 1076px;
    flex-grow: 0;
    margin: 0 auto;
    padding: 18px 28px 19px 28px;
    border-radius: 12px;
    background-color: #eff8f7;
    height: 80px;
    display: flex;
    flex-direction: rows;
    .agenda-body-time {
        font-weight: 800;
        color: #3c3c43;
        font-size: 28px;
        margin-left: 18px;
        line-height: 1.4;
        font-weight: 500;
        width: 200px;
    }
    .agenda-body-time span {
        font-weight: 800;
        color: #87878b;
        font-size: 28px;
        font-weight: 500;
    }
    .agenda-body-good-message {
        width: 100%;
        font-size: 20px;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.8;
        letter-spacing: normal;
        text-align: left;
        color: #00957e;
        span {
            font-weight: bold;
        }
    }
`
export const AgendaBodyBadTime = styled.div`
    width: 1076px;
    flex-grow: 0;
    margin: 0 auto;
    padding: 18px 28px 19px 28px;
    border-radius: 12px;
    background-color: #fef4ee;
    height: 80px;
    display: flex;
    flex-direction: rows;
    .agenda-body-time {
        font-weight: 800;
        color: #3c3c43;
        font-size: 28px;
        margin-left: 18px;
        line-height: 1.4;
        font-weight: 500;
        width: 200px;
    }
    .agenda-body-time span {
        font-weight: 800;
        color: #87878b;
        font-size: 28px;
        font-weight: 500;
    }
    .agenda-body-bad-message {
        width: 100%;
        font-size: 20px;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.8;
        letter-spacing: normal;
        text-align: left;
        color: #e24646;
        span {
            font-weight: bold;
        }
    }
`
export const ActionItemBox = styled.div`
    margin: 0 auto;
`
export const ActionItemText = styled.div`
    margin: 32px 0 16px 58px;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #000;
`
export const ActionItemEl = styled.div`
    width: 1076px;
    height: 56px;
    margin: 16px 32px 12px;
    padding: 16px 20px 16px 20px;
    border-radius: 12px;
    border: solid 1px #f1f1f1;
    background-color: #fff;
    display: grid;
    grid-template-columns: 3.5fr 1.5fr 1fr;
    .action-item-title {
        width: 283px;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
    }
    .action-item-member {
        width: 240px;
        height: 20px;
        flex-grow: 0;
        font-family: Pretendard;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        text-align: left;
        color: #3c3c43;
    }
    .action-item-time {
        width: 120px;
        height: 20px;
        flex-grow: 0;
        font-family: Pretendard;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        text-align: left;
        color: #3c3c43;
    }
`
export const FixBox = styled.div`
    margin-top: 15px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    text-align: left;
    color: #3c3c43;
    .action-middle-title {
        margin-left: 60px;
        margin-bottom: 5px;
    }
`
export const ActionUi = styled.li`
    margin-left: 76px;
    list-style-type: disc;
`
export const ButtonBox = styled.div`
    width: 366px;
    height: 52px;
    display: flex;
    flex-direction: row;
    margin: 84px auto 66px auto;
    .cancel-btn {
        width: 170px;
        height: 52px;
        margin-right: 24px;
        cursor: pointer;
        padding: 10px 20px;
        border-radius: 12px;
        border: solid 1px #d6d6d7;
        background-color: #fff;
    }
    .okay-btn {
        width: 170px;
        height: 52px;
        color: #fff;
        cursor: pointer;
        padding: 10px 20px;
        border-radius: 12px;
        background-color: #162f55;
    }
`
export const MeetDelete = styled.div`
    width: 104px;
    height: 20px;
    flex-grow: 0;
    float: right;
    margin: 0 0 0 8px;
    cursor: pointer;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    text-align: left;
    color: #e2464d;
`
