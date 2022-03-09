import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import useOnClickOutside from '@hooks/useOnClickOutside'
import axios from '@axios'

import RadarChart from '@components/RadarChart'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.34);
    z-index: 5;
`

const ModalContainer = styled.div`
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

const TopContainer = styled.div`
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
const BodyContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 36px;
`
const CheckListContainer = styled.div`
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
const ResultContainer = styled.div`
    width: 429px;
    border-radius: 12px;
    background-color: #fbfbfb;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    padding: 28px 41px;
`

const CheckListReslutBeforeContainer = styled.div`
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

const CheckListReslutAfterContainer = styled.div`
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

const ChartContainer = styled.div`
    width: 300px;
    height: 280px;
    background-color: rgba(255, 0, 0, 0.04);
    margin: 11px auto 12px;
`

const FooterContainer = styled.div`
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
const LabelColor = styled.label<{ textColors?: boolean }>`
    color: ${(props) => (props.textColors ? 'red' : 'blue')};
`
interface Props {
    onClose: () => void
}
function CheckListModal({ onClose }: Props) {
    const ref = useRef<any>()
    const check1 = useRef<any>()

    const [checklistReslut, setChecklistResult] = useState(true)
    const [disable, setDisable] = useState(false)
    // 오너십 3
    const [ownerShipCheck, setOwnerShipCheck] = useState([])
    // 참여도 2
    const [participationCheck, setParticipationCheck] = useState([])
    const [efficiencyCheck, setEfficiencyCheck] = useState([])
    const [productivityCheck, setProductivityCheck] = useState([])

    const [ownerShip, setOwnerShip] = useState(null)
    const [participation, setParticipation] = useState(null)
    const [efficiency, setEfficiency] = useState(null)
    const [productivity, setProductivity] = useState(null)
    const [check, setCheck] = useState(false)

    // const [check1, setCheck1] = useState('')

    const ownerShipHandler = (checked, id) => {
        if (checked) {
            setOwnerShipCheck([...ownerShipCheck, id])
        } else {
            setOwnerShipCheck(ownerShipCheck.filter((el) => el !== id))
        }
    }
    const participatioHandler = (checked, id) => {
        if (checked) {
            setParticipationCheck([...participationCheck, id])
        } else {
            setParticipationCheck(participationCheck.filter((el) => el !== id))
        }
    }
    const efficiencyHandler = (checked, id) => {
        if (checked) {
            setEfficiencyCheck([...efficiencyCheck, id])
        } else {
            setEfficiencyCheck(efficiencyCheck.filter((el) => el !== id))
        }
    }
    const productivityHandler = (checked, id) => {
        if (checked) {
            setProductivityCheck([...productivityCheck, id])
        } else {
            setProductivityCheck(productivityCheck.filter((el) => el !== id))
        }
    }

    let resultdatas: Array<number> = [
        ownerShip,
        participation,
        efficiency,
        productivity,
    ]
    const createCheckBtn = () => {
        axios
            .post('http://127.0.0.1:8000/api/selfcheck/', {
                meet_id: 4,
                ownership: [ownerShipCheck],
                participation: [participationCheck],
                efficiency: [efficiencyCheck],
                productivity: [productivityCheck],
            })
            .then((res) => {
                // console.log(
                //     ownerShipCheck,
                //     participationCheck,
                //     efficiencyCheck,
                //     productivityCheck
                // )
                // console.log(res)
            })
    }

    const changeClick = () => {
        setOwnerShip(ownerShipCheck.length * 10)
        setParticipation(participationCheck.length * 15)
        setEfficiency(efficiencyCheck.length * 15)
        setProductivity(productivityCheck.length * 10)
    }
    const resultdata = [ownerShip, participation, efficiency, productivity]
    const plusData = ownerShip + participation + efficiency + productivity
    // console.log('plusData', plusData)

    function resultText() {
        if (plusData === 120) {
            return (
                <div>
                    Wow! 흠잡을 곳 없이 완벽한 회의군요!👍👍👍 더할 나위 없이
                    효율적인 회의를 한 우리 팀원들 모두 진정한 일잘러!
                </div>
            )
        } else if (plusData >= 75) {
            return (
                <div>
                    짝짝!👏 아주 좋아요! 약간의 아쉬운 부분만 채운다면 완벽한
                    회의를 진행할 수 있을 것 같은데요?☺️
                </div>
            )
        } else if (plusData >= 50) {
            return (
                <div>
                    그럭저럭 효율적인 회의를 하셨네요! 부족한 부분이 무엇인지
                    확인해보고 다음 번 회의 때 개선해보아요!{' '}
                </div>
            )
        } else if (plusData >= 25) {
            return (
                <div>
                    약간은 아쉬운 회의였네요😢 다음 회의에서는 어떤 부분을 좀 더
                    충족시킬 수 있을지 팀원들과 함께 상의해보세요!
                </div>
            )
        } else if (plusData >= 0) {
            return (
                <div>
                    0오늘 회의는 다소 아쉽네요..😭 다음 회의는 좀 더 나아질 수
                    있도록 팀원들과 함께 이번 회의를 회고해볼까요? 회의 회고란?
                </div>
            )
        }
    }
    useOnClickOutside(ref, () => {
        onClose()
    })

    // useEffect(() => {
    //     axios
    //         .get('http://127.0.0.1:8000/api/selfcheck/?meet_id=3')
    //         .then((res) => {
    //             console.log('00', res.data)
    //             if (plusData.length === 0) {
    //                 console.log('11', res.data)
    //                 setDisable(false)
    //                 setChecklistResult(true)
    //                 console.log('11')
    //             } else {
    //                 console.log('ddfdf')
    //                 // setOwnerShipCheck((res.data.ownership || '').split(','))
    //                 // setParticipationCheck(res.data.participation.split(','))
    //                 // setEfficiencyCheck(res.data.efficiency.split(','))
    //                 // setProductivityCheck(res.data.productivity.split(','))
    //                 console.log('22', res.data)
    //                 setDisable(true)
    //                 setChecklistResult(false)
    //                 // console.log('333', ownerShip.split(','))
    //                 // console.log('22', res.data.ownership.split(','))
    //             }
    //         })
    // }, [])

    return (
        <Container>
            <ModalContainer ref={ref}>
                <TopContainer>
                    <div className="top_title">회의 자가진단 CheckList</div>
                    <div className="top_description">
                        <p>회의를 잘 마치셨나요?</p>
                        <p>
                            회의를 진행하는 시간만큼 회의에 대해 평가하고
                            회고하는 시간도 중요합니다. 앞으로 더 효율적인
                            회의를 진행하기 위해 팀원들과 이번 회의를
                            평가해볼까요?
                        </p>
                    </div>
                </TopContainer>
                <BodyContainer>
                    <CheckListContainer>
                        <div>
                            <div className="checklist_title">
                                나의 오너십(Ownership)은? (30점)
                            </div>
                            <div className="checklist">
                                <label
                                    style={{
                                        color: disable ? '#87878b' : 'black',
                                    }}
                                >
                                    <input
                                        ref={check1}
                                        className="checkcomm"
                                        type="checkbox"
                                        readOnly
                                        id="check1"
                                        disabled={disable}
                                        onChange={(e) => {
                                            ownerShipHandler(
                                                e.currentTarget.checked,
                                                'check1'
                                            )
                                            setCheck(check ? false : true)
                                        }}
                                        checked={
                                            ownerShipCheck.includes('check1')
                                                ? true
                                                : false
                                        }
                                    />
                                    나는, 회의에서 무엇에 대한 결정을
                                    내려야하는지 명확히 알고 있었어요.
                                </label>
                                <label
                                    style={{
                                        color: disable ? '#87878b' : 'black',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check2"
                                        disabled={disable}
                                        onChange={(e) => {
                                            ownerShipHandler(
                                                e.currentTarget.checked,
                                                'check2'
                                            )
                                            setCheck(check ? false : true)
                                        }}
                                        checked={
                                            ownerShipCheck.includes('check2')
                                                ? true
                                                : false
                                        }
                                    />
                                    나는, 이 회의에서 목적에 부합하는 이야기
                                    흐름을 유지되도록 노력했어요.
                                </label>
                                <label
                                    style={{
                                        color: disable ? '#87878b' : 'black',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check3"
                                        disabled={disable}
                                        onChange={(e) => {
                                            ownerShipHandler(
                                                e.currentTarget.checked,
                                                'check3'
                                            )
                                        }}
                                        checked={
                                            ownerShipCheck.includes('check3')
                                                ? true
                                                : false
                                        }
                                    />
                                    나는, 모든 참여자가 회의 목적이 무엇인지
                                    알게하려고 노력했어요.
                                </label>
                            </div>
                        </div>
                        {/* ************** 두번째 진단 ************ */}
                        <div style={{ marginTop: '36px' }}>
                            <div className="checklist_title">
                                참여자들의 참여도는? (30점)
                            </div>
                            <div className="checklist">
                                <label
                                    style={{
                                        color: disable ? '#87878b' : 'black',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check4"
                                        disabled={disable}
                                        onChange={(e) => {
                                            participatioHandler(
                                                e.currentTarget.checked,
                                                'check4'
                                            )
                                        }}
                                        checked={
                                            participationCheck.includes(
                                                'check4'
                                            )
                                                ? true
                                                : false
                                        }
                                    />
                                    참여자들은, 경직되지 않은 분위기에서 회의에
                                    참여할 수 있었어요.
                                </label>
                                <label
                                    style={{
                                        color: disable ? '#87878b' : 'black',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check5"
                                        disabled={disable}
                                        onChange={(e) => {
                                            participatioHandler(
                                                e.currentTarget.checked,
                                                'check5'
                                            )
                                        }}
                                        checked={
                                            participationCheck.includes(
                                                'check5'
                                            )
                                                ? true
                                                : false
                                        }
                                    />
                                    참여자들은, 모두 골고루 발언의 기회를
                                    가졌어요.
                                </label>
                            </div>
                        </div>
                        {/* *********** 3 번째 진단 *********** */}
                        <div style={{ marginTop: '36px' }}>
                            <div className="checklist_title">
                                나의 오너십(Ownership)은? (30점)
                            </div>
                            <div className="checklist">
                                <label
                                    style={{
                                        color: disable ? '#87878b' : 'black',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check6"
                                        disabled={disable}
                                        onChange={(e) => {
                                            efficiencyHandler(
                                                e.currentTarget.checked,
                                                'check6'
                                            )
                                        }}
                                        checked={
                                            efficiencyCheck.includes('check6')
                                                ? true
                                                : false
                                        }
                                    />
                                    회의가, 제 시간에 결과물을 도출하고
                                    끝났어요.
                                </label>
                                <label
                                    style={{
                                        color: disable ? '#87878b' : 'black',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check7"
                                        disabled={disable}
                                        onChange={(e) => {
                                            efficiencyHandler(
                                                e.currentTarget.checked,
                                                'check7'
                                            )
                                        }}
                                        checked={
                                            efficiencyCheck.includes('check7')
                                                ? true
                                                : false
                                        }
                                    />
                                    회의가, 대체로 맴돌거나 주제에서 벗어나지
                                    않고 진행되었어요.
                                </label>
                            </div>
                        </div>
                        {/* ************ 4 번째 진단 ************* */}
                        <div style={{ marginTop: '36px' }}>
                            <div className="checklist_title">
                                참여자들의 참여도는? (30점)
                            </div>
                            <div className="checklist">
                                <label
                                    style={{
                                        color: disable ? '#87878b' : 'black',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check8"
                                        disabled={disable}
                                        onChange={(e) => {
                                            productivityHandler(
                                                e.currentTarget.checked,
                                                'check8'
                                            )
                                        }}
                                        checked={
                                            productivityCheck.includes('check8')
                                                ? true
                                                : false
                                        }
                                    />
                                    결정사항(또는 next action item)이
                                    도출되었어요.
                                </label>
                                <label
                                    style={{
                                        color: disable ? '#87878b' : 'black',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check9"
                                        disabled={disable}
                                        onChange={(e) => {
                                            productivityHandler(
                                                e.currentTarget.checked,
                                                'check9'
                                            )
                                        }}
                                        checked={
                                            productivityCheck.includes('check9')
                                                ? true
                                                : false
                                        }
                                    />
                                    결정사항의 실행 주체가 정해졌어요.
                                </label>
                                <label
                                    style={{
                                        color: disable ? '#87878b' : 'black',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check0"
                                        disabled={disable}
                                        onChange={(e) => {
                                            productivityHandler(
                                                e.currentTarget.checked,
                                                'check0'
                                            )
                                        }}
                                        checked={
                                            productivityCheck.includes('check0')
                                                ? true
                                                : false
                                        }
                                    />
                                    결정사항의 실행 일정이 정해졌어요.
                                </label>
                            </div>
                        </div>
                    </CheckListContainer>
                    <ResultContainer>
                        {checklistReslut ? (
                            <CheckListReslutBeforeContainer>
                                <div className="result_info">
                                    Checklist 선택이 완료되었다면 아래 버튼을
                                    클릭해주세요!
                                </div>
                                <button
                                    className="result_btn"
                                    onClick={() => {
                                        setDisable(true)
                                        setChecklistResult(false)
                                        changeClick()
                                        createCheckBtn()
                                    }}
                                >
                                    자가진단 결과보기
                                </button>
                            </CheckListReslutBeforeContainer>
                        ) : (
                            <CheckListReslutAfterContainer>
                                <div className="checklist_after_header">
                                    <p className="checklist_after_header_title">
                                        이번 회의 자가진단 결과는?
                                    </p>
                                    <p className="checklist_after_header_description">
                                        {plusData}점
                                    </p>
                                </div>
                                <ChartContainer>
                                    <RadarChart data={resultdatas} />
                                </ChartContainer>
                                <div className="checklist_after_footer">
                                    {resultText()}
                                </div>
                            </CheckListReslutAfterContainer>
                        )}
                    </ResultContainer>
                </BodyContainer>
                <FooterContainer>
                    <button className="none-btn">나중에 할게요</button>
                    <button className="success-btn">자가진단 완료</button>
                </FooterContainer>
            </ModalContainer>
        </Container>
    )
}

export default CheckListModal
