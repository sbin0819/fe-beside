import React, { useState, useEffect } from 'react'
import axios from '@axios'
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
import RadarChart from '@components/RadarChart'

function CheckData(CheckProps) {
    // const [check1, setCheck1] = useState(CheckProps.checkData.check1)
    // const [check2, setCheck2] = useState(CheckProps.checkData.check2)
    // const [check3, setCheck3] = useState(CheckProps.checkData.check3)
    // const [check4, setCheck4] = useState(CheckProps.checkData.check4)
    // const [check5, setCheck5] = useState(CheckProps.checkData.check5)
    // const [check6, setCheck6] = useState(CheckProps.checkData.check6)
    // const [check7, setCheck7] = useState(CheckProps.checkData.check7)
    // const [check8, setCheck8] = useState(CheckProps.checkData.check8)
    // const [check9, setCheck9] = useState(CheckProps.checkData.check9)
    // const [check10, setCheck10] = useState(CheckProps.checkData.check10)

    // const [inputs, setInputs] = useState({
    //     check1: null,
    //     check2: null,
    //     check3: null,
    //     check4: null,
    //     check5: null,
    //     check6: null,
    //     check7: null,
    //     check8: null,
    //     check9: null,
    //     check10: null,
    // })
    // const {
    //     check1,
    //     check2,
    //     check3,
    //     check4,
    //     check5,
    //     check6,
    //     check7,
    //     check8,
    //     check9,
    //     check10,
    // } = inputs
    // const onChange = (e) => {
    //     const { value, name } = e.target
    //     setInputs({ ...inputs, [name]: value })
    // }

    // const [ownerShip, setOwnerShip] = useState([check1, check2, check3])
    const [participation, setParticipation] = useState([])
    const [efficiency, setEfficiency] = useState([])
    const [productivity, setProductivity] = useState([])

    // const changeClick = () => {
    //     setOwnerShip(ownerShipCheck.length * 10)
    //     setParticipation(participationCheck.length * 15)
    //     setEfficiency(efficiencyCheck.length * 15)
    //     setProductivity(productivityCheck.length * 10)
    // }

    // const plusData = ownerShip + participation + efficiency + productivity

    // function resultText() {
    //     if (plusData >= 75) {
    //         return <div>75점까지의 점수 설명입니다!</div>
    //     } else if (plusData >= 50) {
    //         return <div>50점까지의 점수 설명입니다!</div>
    //     } else if (plusData >= 25) {
    //         return <div>25점까지의 점수 설명입니다!</div>
    //     } else if (plusData >= 0) {
    //         return <div>0점까지의 점수 설명입니다!</div>
    //     }
    // }

    useEffect(() => {
        // setInputs(CheckProps.checkData)
        // console.log('여기 데이터 잇는 곳', CheckProps.checkData)
        // console.log('check1 -- ', CheckProps.checkData.check1)
    }, [])

    return (
        <BodyContainer>
            <CheckListContainer>
                <div>
                    <div className="checklist_title">
                        {/* 나의 오너십(Ownership)은? (30점) */}
                        제발... 여긴 데이터 있는 곳 000
                    </div>
                    <div className="checklist">
                        <label>
                            <input
                                className="checkcomm"
                                type="checkbox"
                                readOnly
                                id="check1"
                                // checked={check1 === null ? true : false}
                            />
                            나는, 회의에서 무엇에 대한 결정을 내려야하는지
                            명확히 알고 있었어요.
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                readOnly
                                id="check2"
                                // onChange={onChange}
                                // checked={check2 === null ? true : false}
                                checked={true}
                            />
                            나는, 이 회의에서 목적에 부합하는 이야기 흐름을
                            유지되도록 노력했어요.
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                readOnly
                                id="check3"
                                // checked={check3 === null ? true : false}
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
                                readOnly
                                id="check4"
                                // checked={check4 === null ? true : false}
                            />
                            참여자들은, 경직되지 않은 분위기에서 회의에 참여할
                            수 있었어요.
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                readOnly
                                id="check5"
                                // checked={check5 === null ? true : false}
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
                            <input type="checkbox" readOnly id="check6" />
                            회의가, 제 시간에 결과물을 도출하고 끝났어요.
                        </label>
                        <label>
                            <input type="checkbox" readOnly id="check7" />
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
                            <input type="checkbox" readOnly id="check8" />
                            결정사항(또는 next action item)이 도출되었어요.
                        </label>
                        <label>
                            <input type="checkbox" readOnly id="check9" />
                            결정사항의 실행 주체가 정해졌어요.
                        </label>
                        <label>
                            <input type="checkbox" readOnly id="check0" />
                            결정사항의 실행 일정이 정해졌어요.
                        </label>
                    </div>
                </div>
            </CheckListContainer>
            <ResultContainer>
                <CheckListReslutAfterContainer>
                    <div className="checklist_after_header">
                        <p className="checklist_after_header_title">
                            이번 회의 자가진단 결과는?
                        </p>
                        <p className="checklist_after_header_description">점</p>
                    </div>
                    <ChartContainer>
                        {/* <RadarChart data={resultdatas} /> */}
                    </ChartContainer>
                    {/* <div className="checklist_after_footer">{resultText()}</div> */}
                </CheckListReslutAfterContainer>
            </ResultContainer>
        </BodyContainer>
    )
}

export default CheckData
