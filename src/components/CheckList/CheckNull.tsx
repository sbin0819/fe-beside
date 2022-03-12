import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import useOnClickOutside from '@hooks/useOnClickOutside'
import axios from '@axios'

import RadarChart from '@components/RadarChart'
import {
    Container,
    ModalContainer,
    TopContainer,
    BodyContainer,
    CheckListContainer,
    ResultContainer,
    CheckListReslutBeforeContainer,
    CheckListReslutAfterContainer,
    ChartContainer,
    FooterContainer,
} from './style'

function CheckNull() {
    useEffect(() => {
        console.log('데이터 없어')
    }, [])
    // const check1 = useRef<any>()

    const [checklistReslut, setChecklistResult] = useState(true)
    const [disable, setDisable] = useState(false)
    // 오너십 3

    const [ownerShip, setOwnerShip] = useState(null)
    const [participation, setParticipation] = useState(null)
    const [efficiency, setEfficiency] = useState(null)
    const [productivity, setProductivity] = useState(null)

    const [check1, setCheck1] = useState(null)
    const [check2, setCheck2] = useState(null)
    const [check3, setCheck3] = useState(null)
    const [check4, setCheck4] = useState(null)
    const [check5, setCheck5] = useState(null)
    const [check6, setCheck6] = useState(null)
    const [check7, setCheck7] = useState(null)
    const [check8, setCheck8] = useState(null)
    const [check9, setCheck9] = useState(null)
    const [check10, setCheck10] = useState(null)

    // const [ownerShipCheck, setOwnerShipCheck] = useState([])
    // 참여도 2
    // const [participationCheck, setParticipationCheck] = useState([])
    // const [efficiencyCheck, setEfficiencyCheck] = useState([])
    // const [productivityCheck, setProductivityCheck] = useState([])

    let resultdatas: Array<number> = [
        ownerShip,
        participation,
        efficiency,
        productivity,
    ]
    const createCheckBtn = () => {
        console.log('resultdata', resultdata)
        console.log(
            'ownerShip',
            check1,
            check2,
            check3,
            check4,
            check5,
            check6,
            check7,
            check8,
            check9,
            check10
        )
        // axios
        //     .post('http://127.0.0.1:8000/api/selfcheck/', {
        //         meet_id: 2,
        //         check1: check1,
        //         check2: check2,
        //         check3: check3,
        //         check4: check4,
        //         check5: check5,
        //         check6: check6,
        //         check7: check7,
        //         check8: check8,
        //         check9: check9,
        //         check10: check10,
        //     })
        //     .then((res) => {
        //         console.log(
        //             check1,
        //             check2,
        //             check3,
        //             check4,
        //             check5,
        //             check6,
        //             check7,
        //             check8,
        //             check9,
        //             check10
        //         )
        //         console.log(res)
        //     })
    }
    const ownerShipCheck = [check1, check2, check3]
    const participationCheck = [check4, check5]
    const efficiencyCheck = [check6, check7]
    const productivityCheck = [check8, check9, check10]
    const changeClick = () => {
        console.log('ownerShipCheck---', ownerShipCheck.length)
        setOwnerShip(ownerShipCheck.length * 10)
        setParticipation(participationCheck.length * 15)
        setEfficiency(efficiencyCheck.length * 15)
        setProductivity(productivityCheck.length * 10)
    }
    const resultdata = [ownerShip, participation, efficiency, productivity]
    const plusData = ownerShip + participation + efficiency + productivity

    function resultText() {
        console.log(plusData)
        if (plusData >= 75) {
            return <div>75점까지의 점수 설명입니다!</div>
        } else if (plusData >= 50) {
            return <div>50점까지의 점수 설명입니다!</div>
        } else if (plusData >= 25) {
            return <div>25점까지의 점수 설명입니다!</div>
        } else if (plusData >= 0) {
            return <div>0점까지의 점수 설명입니다!</div>
        }
    }

    return (
        <BodyContainer>
            <CheckListContainer>
                <div>
                    <div className="checklist_title">
                        {/* 나의 오너십(Ownership)은? (30점) */}
                        제발... 여긴 데이터 없는 곳
                    </div>
                    <div className="checklist">
                        <label>
                            <input
                                className="checkcomm"
                                type="checkbox"
                                id="check1"
                                name="check1"
                                value="check1"
                                onChange={() => {
                                    if (check1) {
                                        setCheck1(null)
                                    } else {
                                        setCheck1('Y')
                                    }
                                }}
                                checked={check1 ? true : false}
                            />
                            나는, 회의에서 무엇에 대한 결정을 내려야하는지
                            명확히 알고 있었어요.
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                // readOnly
                                id="check2"
                                name="check2"
                                onChange={(e) => {
                                    if (check2) {
                                        setCheck2(null)
                                        console.log('ddd')
                                    } else {
                                        setCheck2('Y')
                                        console.log('ccc')
                                    }
                                }}
                                checked={check2 ? true : false}
                            />
                            나는, 이 회의에서 목적에 부합하는 이야기 흐름을
                            유지되도록 노력했어요.
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                id="check3"
                                onChange={() => {
                                    if (check3) {
                                        setCheck3(null)
                                    } else {
                                        setCheck3('Y')
                                    }
                                }}
                                checked={check3 ? true : false}
                            />
                            나는, 모든 참여자가 회의 목적이 무엇인지 알게하려고
                            노력했어요.
                        </label>
                    </div>
                </div>
                {/* ************** 두번째 진단 ************ */}
                <div style={{ marginTop: '36px' }}>
                    <div className="checklist_title">
                        참여자들의 참여도는? (30점)
                    </div>
                    <div className="checklist">
                        <label>
                            <input
                                type="checkbox"
                                id="check4"
                                onChange={() => {
                                    if (check4) {
                                        setCheck4(null)
                                    } else {
                                        setCheck4('Y')
                                    }
                                }}
                                checked={check4 ? true : false}
                            />
                            참여자들은, 경직되지 않은 분위기에서 회의에 참여할
                            수 있었어요.
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                id="check5"
                                onChange={() => {
                                    if (check5) {
                                        setCheck5(null)
                                    } else {
                                        setCheck5('Y')
                                    }
                                }}
                                checked={check5 ? true : false}
                            />
                            참여자들은, 모두 골고루 발언의 기회를 가졌어요.
                        </label>
                    </div>
                </div>
                {/* *********** 3 번째 진단 *********** */}
                <div style={{ marginTop: '36px' }}>
                    <div className="checklist_title">
                        나의 오너십(Ownership)은? (30점)
                    </div>
                    <div className="checklist">
                        <label>
                            <input
                                type="checkbox"
                                id="check6"
                                onChange={() => {
                                    if (check6) {
                                        setCheck6(null)
                                    } else {
                                        setCheck6('Y')
                                    }
                                }}
                                checked={check6 ? true : false}
                            />
                            회의가, 제 시간에 결과물을 도출하고 끝났어요.
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                id="check7"
                                onChange={() => {
                                    if (check7) {
                                        setCheck7(null)
                                    } else {
                                        setCheck7('Y')
                                    }
                                }}
                                checked={check7 ? true : false}
                            />
                            회의가, 대체로 맴돌거나 주제에서 벗어나지 않고
                            진행되었어요.
                        </label>
                    </div>
                </div>
                {/* ************ 4 번째 진단 ************* */}
                <div style={{ marginTop: '36px' }}>
                    <div className="checklist_title">
                        참여자들의 참여도는? (30점)
                    </div>
                    <div className="checklist">
                        <label>
                            <input
                                type="checkbox"
                                id="check8"
                                onChange={() => {
                                    if (check8) {
                                        setCheck8(null)
                                    } else {
                                        setCheck8('Y')
                                    }
                                }}
                                checked={check8 ? true : false}
                            />
                            결정사항(또는 next action item)이 도출되었어요.
                        </label>
                        <label
                            style={{
                                color: disable ? '#87878b' : 'black',
                            }}
                        >
                            <input
                                type="checkbox"
                                id="check9"
                                onChange={() => {
                                    if (check9) {
                                        setCheck9(null)
                                    } else {
                                        setCheck9('Y')
                                    }
                                }}
                                checked={check9 ? true : false}
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
                                id="check10"
                                onChange={() => {
                                    if (check10) {
                                        setCheck10(null)
                                    } else {
                                        setCheck10('Y')
                                    }
                                }}
                                checked={check10 ? true : false}
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
                            <RadarChart data={resultdata} />
                        </ChartContainer>
                        <div className="checklist_after_footer">
                            {resultText()}
                        </div>
                    </CheckListReslutAfterContainer>
                )}
            </ResultContainer>
        </BodyContainer>
    )
}

export default CheckNull
