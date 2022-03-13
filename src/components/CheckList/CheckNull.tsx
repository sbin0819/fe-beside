import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import useOnClickOutside from '@hooks/useOnClickOutside'
import axios from '@axios'
import { useRouter } from 'next/router'
import RadarChart from '@components/RadarChart'
import {
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
interface Props {
    onClose: () => void
}
interface BooProps {
    deactivate?: boolean
}
function CheckNull({ onClose }: Props, { deactivate }: BooProps) {
    const ref = useRef<any>()
    const router = useRouter()
    const { id } = router.query
    useOnClickOutside(ref, () => {
        onClose()
    })

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
    interface Props {
        onClose: () => void
    }
    const createCheckBtn = () => {
        axios
            .post('http://127.0.0.1:8000/api/selfcheck/', {
                meet_id: id,
                check1: check1,
                check2: check2,
                check3: check3,
                check4: check4,
                check5: check5,
                check6: check6,
                check7: check7,
                check8: check8,
                check9: check9,
                check10: check10,
            })
            .then((res) => {
                // console.log(res)
            })
    }
    const ownerShipCheck = [check1, check2, check3]
    const ownerShipCheck_length = ownerShipCheck.filter((check) => check === 'Y')
    const participationCheck = [check4, check5]
    const participationCheck_length = participationCheck.filter((check) => check === 'Y')
    const efficiencyCheck = [check6, check7]
    const efficiencyCheck_length = efficiencyCheck.filter((check) => check === 'Y')
    const productivityCheck = [check8, check9, check10]
    const productivityCheck_length = productivityCheck.filter((check) => check === 'Y')

    const changeClick = () => {
        // console.log('ownerShipCheck---', ownerShipCheck_length.length * 10)
        setOwnerShip(ownerShipCheck_length.length * 10)
        setParticipation(participationCheck_length.length * 15)
        setEfficiency(efficiencyCheck_length.length * 15)
        setProductivity(productivityCheck_length.length * 10)
    }
    const resultdata: Array<number> = [ownerShip, participation, efficiency, productivity]
    // console.log('resultdata', resultdata)
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
    useEffect(() => {
        // deactivate === false
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
                                    나는, 회의에서 무엇에 대한 결정을 내려야하는지 명확히 알고
                                    있었어요.
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
                                                // console.log('ddd')
                                            } else {
                                                setCheck2('Y')
                                                // console.log('ccc')
                                            }
                                        }}
                                        checked={check2 ? true : false}
                                    />
                                    나는, 이 회의에서 목적에 부합하는 이야기 흐름을 유지되도록
                                    노력했어요.
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
                                    나는, 모든 참여자가 회의 목적이 무엇인지 알게하려고 노력했어요.
                                </label>
                            </div>
                        </div>
                        {/* ************** 두번째 진단 ************ */}
                        <div style={{ marginTop: '36px' }}>
                            <div className="checklist_title">참여자들의 참여도는? (30점)</div>
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
                                    참여자들은, 경직되지 않은 분위기에서 회의에 참여할 수 있었어요.
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
                            <div className="checklist_title">나의 오너십(Ownership)은? (30점)</div>
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
                                    회의가, 대체로 맴돌거나 주제에서 벗어나지 않고 진행되었어요.
                                </label>
                            </div>
                        </div>
                        {/* ************ 4 번째 진단 ************* */}
                        <div style={{ marginTop: '36px' }}>
                            <div className="checklist_title">참여자들의 참여도는? (30점)</div>
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
                                    Checklist 선택이 완료되었다면 아래 버튼을 클릭해주세요!
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
                                <div className="checklist_after_footer">{resultText()}</div>
                            </CheckListReslutAfterContainer>
                        )}
                    </ResultContainer>
                </BodyContainer>
                <FooterContainer>
                    <button className="none-btn" onClick={() => onClose()}>
                        나중에 할게요
                    </button>
                    <button
                        className="success-btn"
                        style={{ backgroundColor: '#bac0cc', color: '#fff' }}
                        onClick={() => onClose()}
                    >
                        자가진단 완료
                    </button>
                </FooterContainer>
            </ModalContainer>
        </>
    )
}

export default CheckNull
