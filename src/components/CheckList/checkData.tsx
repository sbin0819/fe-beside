import React, { useState, useEffect, useRef } from 'react'
import axios from '@axios'
import useOnClickOutside from '@hooks/useOnClickOutside'
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
interface Props {
    onClose: () => void
}
interface BooProps {
    deactivate?: boolean
}
function CheckData(CheckProps, { onClose }: Props) {
    const ref = useRef<any>()
    useOnClickOutside(ref, () => {
        onClose()
    })
    const checkDatas = CheckProps?.checkData?.[0]

    const [ownerShip, setOwnerShip] = useState(null)
    const [participation, setParticipation] = useState(null)
    const [efficiency, setEfficiency] = useState(null)
    const [productivity, setProductivity] = useState(null)

    const tenResullt = [
        checkDatas?.check1,
        checkDatas?.check2,
        checkDatas?.check3,
        checkDatas?.check8,
        checkDatas?.check9,
        checkDatas?.check10,
    ]
    const fiveResult = [
        checkDatas?.check4,
        checkDatas?.check5,
        checkDatas?.check6,
        checkDatas?.check7,
    ]
    const ten_length = tenResullt.filter((check) => check === 'Y')
    const five_length = fiveResult.filter((check) => check === 'Y')
    const tenScore = ten_length.length * 10
    const fiveScore = five_length.length * 15
    // const plusData = fiveScore + tenScore

    const ownerShipCheck = [checkDatas?.check1, checkDatas?.check2, checkDatas?.check3]
    const ownerShipCheck_length = ownerShipCheck.filter((check) => check === 'Y')
    const participationCheck = [checkDatas?.check4, checkDatas?.check5]
    const participationCheck_length = participationCheck.filter((check) => check === 'Y')
    const efficiencyCheck = [checkDatas?.check6, checkDatas?.check7, checkDatas?.check8]
    const efficiencyCheck_length = efficiencyCheck.filter((check) => check === 'Y')
    const productivityCheck = [checkDatas?.check9, checkDatas?.check10]
    const productivityCheck_length = productivityCheck.filter((check) => check === 'Y')

    // const changeClick = () => {
    //     console.log('ownerShipCheck---', ownerShipCheck_length.length * 10)
    //     setOwnerShip(ownerShipCheck_length.length * 10)
    //     setParticipation(participationCheck_length.length * 15)
    //     setEfficiency(efficiencyCheck_length.length * 15)
    //     setProductivity(productivityCheck_length.length * 10)
    // }

    const plusData = ownerShip + participation + efficiency + productivity

    function resultText() {
        if (plusData <= 24) {
            return (
                <div>
                    오늘 회의는 다소 아쉽네요..😭 다음 회의는 좀 더 나아질 수 있도록 팀원들과 함께
                    이번 회의를 회고해볼까요?
                </div>
            )
        } else if (plusData <= 49) {
            return (
                <div>
                    약간은 아쉬운 회의였네요😢 다음 회의에서는 어떤 부분을 좀 더 충족시킬 수 있을지
                    팀원들과 함께 상의해보세요!
                </div>
            )
        } else if (plusData <= 74) {
            return (
                <div>
                    그럭저럭 효율적인 회의를 하셨네요! 부족한 부분이 무엇인지 확인해보고 다음 번
                    회의 때 개선해보아요!{' '}
                </div>
            )
        } else if (plusData <= 119) {
            return (
                <div>
                    짝짝!👏 아주 좋아요! 약간의 아쉬운 부분만 채운다면 완벽한 회의를 진행할 수 있을
                    것 같은데요?☺️
                </div>
            )
        } else if (plusData === 120) {
            return (
                <div>
                    Wow! 흠잡을 곳 없이 완벽한 회의군요!👍👍👍 더할 나위 없이 효율적인 회의를 한
                    우리 팀원들 모두 진정한 일잘러!
                </div>
            )
        }
    }
    const resultdata: Array<number> = [ownerShip, participation, efficiency, productivity]
    console.log('resultdata', resultdata)
    useEffect(() => {
        setOwnerShip(ownerShipCheck_length.length * 10)
        setParticipation(participationCheck_length.length * 15)
        setEfficiency(efficiencyCheck_length.length * 15)
        setProductivity(productivityCheck_length.length * 10)
    }, [])

    return (
        <>
            <ModalContainer ref={ref}>
                <TopContainer>
                    <div className="top_title">회의 자가진단 CheckList</div>
                    <div className="top_description">
                        <p>회의를 잘 마치셨나요?</p>
                        <p>
                            회의를 진행하는 시간만큼 회의에 대해 평가하고 회고하는 시간도
                            중요합니다. 앞으로 더 효율적인 회의를 진행하기 위해 팀원들과 이번 회의를
                            평가해볼까요?
                        </p>
                    </div>
                </TopContainer>
                <BodyContainer>
                    <CheckListContainer>
                        <div>
                            <div className="checklist_title">나의 오너십(Ownership)은? (30점)</div>
                            <div className="checklist">
                                <label style={{ color: checkDatas?.check1 ? '#87878b' : 'black' }}>
                                    <input
                                        className="checkcomm"
                                        type="checkbox"
                                        readOnly
                                        id="check1"
                                        disabled={checkDatas?.check1 ? true : false}
                                        checked={checkDatas?.check1 ? false : true}
                                    />
                                    나는, 회의에서 무엇에 대한 결정을 내려야하는지 명확히 알고
                                    있었어요.
                                </label>
                                <label style={{ color: checkDatas?.check2 ? '#87878b' : 'black' }}>
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check2"
                                        disabled={checkDatas?.check2 ? true : false}
                                        checked={checkDatas?.check2 ? false : true}
                                    />
                                    나는, 이 회의에서 목적에 부합하는 이야기 흐름을 유지되도록
                                    노력했어요.
                                </label>
                                <label style={{ color: checkDatas?.check3 ? '#87878b' : 'black' }}>
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check3"
                                        disabled={checkDatas?.check3 ? true : false}
                                        checked={checkDatas?.check3 ? false : true}
                                    />
                                    나는, 모든 참여자가 회의 목적이 무엇인지 알게하려고 노력했어요.
                                </label>
                            </div>
                        </div>
                        {/* ************** 두번째 진단 ************ */}
                        <div style={{ marginTop: '36px' }}>
                            <div className="checklist_title">참여자들의 참여도는? (30점)</div>
                            <div className="checklist">
                                <label style={{ color: checkDatas?.check4 ? '#87878b' : 'black' }}>
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check4"
                                        disabled={checkDatas?.check4 ? true : false}
                                        checked={checkDatas?.check4 ? false : true}
                                    />
                                    참여자들은, 경직되지 않은 분위기에서 회의에 참여할 수 있었어요.
                                </label>
                                <label style={{ color: checkDatas?.check5 ? '#87878b' : 'black' }}>
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check5"
                                        disabled={checkDatas?.check5 ? true : false}
                                        checked={checkDatas?.check5 ? false : true}
                                    />
                                    참여자들은, 모두 골고루 발언의 기회를 가졌어요.
                                </label>
                            </div>
                        </div>
                        {/* *********** 3 번째 진단 *********** */}
                        <div style={{ marginTop: '36px' }}>
                            <div className="checklist_title">나의 오너십(Ownership)은? (30점)</div>
                            <div className="checklist">
                                <label style={{ color: checkDatas?.check6 ? '#87878b' : 'black' }}>
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check6"
                                        disabled={checkDatas?.check6 ? true : false}
                                        checked={checkDatas?.check6 ? false : true}
                                    />
                                    회의가, 제 시간에 결과물을 도출하고 끝났어요.
                                </label>
                                <label style={{ color: checkDatas?.check7 ? '#87878b' : 'black' }}>
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check7"
                                        disabled={checkDatas?.check7 ? true : false}
                                        checked={checkDatas?.check7 ? false : true}
                                    />
                                    회의가, 대체로 맴돌거나 주제에서 벗어나지 않고 진행되었어요.
                                </label>
                            </div>
                        </div>
                        {/* ************ 4 번째 진단 ************* */}
                        <div style={{ marginTop: '36px' }}>
                            <div className="checklist_title">참여자들의 참여도는? (30점)</div>
                            <div className="checklist">
                                <label style={{ color: checkDatas?.check8 ? '#87878b' : 'black' }}>
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check8"
                                        disabled={checkDatas?.check8 ? true : false}
                                        checked={checkDatas?.check8 ? false : true}
                                    />
                                    결정사항(또는 next action item)이 도출되었어요.
                                </label>
                                <label style={{ color: checkDatas?.check9 ? '#87878b' : 'black' }}>
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check9"
                                        disabled={checkDatas?.check9 ? true : false}
                                        checked={checkDatas?.check9 ? false : true}
                                    />
                                    결정사항의 실행 주체가 정해졌어요.
                                </label>
                                <label style={{ color: checkDatas?.check10 ? '#87878b' : 'black' }}>
                                    <input
                                        type="checkbox"
                                        readOnly
                                        id="check10"
                                        disabled={checkDatas?.check10 ? true : false}
                                        checked={checkDatas?.check10 ? false : true}
                                    />
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
                                <p className="checklist_after_header_description">{plusData}점</p>
                            </div>
                            <ChartContainer>
                                <RadarChart data={resultdata} />
                            </ChartContainer>
                            <div className="checklist_after_footer">{resultText()}</div>
                        </CheckListReslutAfterContainer>
                    </ResultContainer>
                </BodyContainer>
                <FooterContainer>
                    <button className="none-btn">다시 할게요</button>
                    <button
                        className="success-btn"
                        style={{ cursor: 'pointer' }}
                        onClick={() => onClose()}
                    >
                        자가진단 완료
                    </button>
                </FooterContainer>
            </ModalContainer>
        </>
    )
}

export default CheckData
