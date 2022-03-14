import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import useOnClickOutside from '@hooks/useOnClickOutside'
import axios from '@axios'
import { baseURL } from '@api/index'
import { checkSWR } from '@api/checklist'
import RadarChart from '@components/RadarChart'
import CheckNull from './CheckNull'
import CheckData from './CheckData'
import { useRouter } from 'next/router'
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

const LabelColor = styled.label<{ textColors?: boolean }>`
    color: ${(props) => (props.textColors ? 'red' : '#87878b')};
`
interface Props {
    onClose: () => void
}
interface CheckProps {
    meet_id?: string
    check_id?: string
    check1?: string
    check2?: string
    check3?: string
    check4?: string
    check5?: string
    check6?: string
    check7?: string
    check8?: string
    check9?: string
    check10?: string
    success?: any
}
function CheckListModal({ onClose }: Props) {
    const ref = useRef<any>()
    useOnClickOutside(ref, () => {
        onClose()
    })
    const router = useRouter()
    const { id } = router.query
    // const id = 16
    // const id = 16
    // const { checkData } = checkSWR(id)
    const [checkData, setCheckData] = useState<CheckProps>(null)
    const [checkResult, setCheckResult] = useState(null)
    const [checkPut, setCheckPut] = useState(false)
    const [checklistReslut, setChecklistResult] = useState(true)
    const [disable, setDisable] = useState(false)
    const [checkId, setCheckId] = useState(null)

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

    const ownerShipCheck = [check1, check2, check3 || checkData?.check1, checkData?.check2, checkData?.check3]
    const ownerShipCheck_length = ownerShipCheck.filter((check) => check === 'Y')
    const participationCheck = [check4, check5 || checkData?.check4, checkData?.check5]
    const participationCheck_length = participationCheck.filter((check) => check === 'Y')
    const efficiencyCheck = [check6, check7 || checkData?.check6, checkData?.check7]
    const efficiencyCheck_length = efficiencyCheck.filter((check) => check === 'Y')
    const productivityCheck = [check8, check9, check10 || checkData?.check8, checkData?.check9, checkData?.check10]
    const productivityCheck_length = productivityCheck.filter((check) => check === 'Y')

    const resultdata: Array<number> = [ownerShip, participation, efficiency, productivity]
    // console.log('resultdata', resultdata)
    const plusData = ownerShip + participation + efficiency + productivity

    const changeClick = () => {
        // console.log('ownerShipCheck---', ownerShipCheck_length.length * 10)
        setOwnerShip(ownerShipCheck_length.length * 10)
        setParticipation(participationCheck_length.length * 15)
        setEfficiency(efficiencyCheck_length.length * 15)
        setProductivity(productivityCheck_length.length * 10)
    }

    const createCheckBtn = () => {
        if (!checkPut) {
            axios.post(`${baseURL}/api/selfcheck/`, {
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
            // .then((res) => {
            //     console.log('추가', res)
            // })
        } else if (checkPut) {
            axios.put(`${baseURL}/api/selfcheck/${checkId}/`, {
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
            // .then((res) => {})
        }
    }

    useEffect(() => {
        // console.log(checkData?.check_id)
        axios.get(`${baseURL}/api/selfcheck/?meet_id=${id}`).then((res) => {
            setCheckData(res.data[0])
            setCheckResult(res.data.success)
            setCheckPut(false)
            setCheckId(res.data[0]?.check_id)
            if (res.data[0]) {
                setChecklistResult(false)
            }
        })
        setOwnerShip(ownerShipCheck_length.length * 10)
        setParticipation(participationCheck_length.length * 15)
        setEfficiency(efficiencyCheck_length.length * 15)
        setProductivity(productivityCheck_length.length * 10)
    }, [checkData?.check_id])

    return (
        <Container>
            <ModalContainer ref={ref}>
                <TopContainer>
                    <div className="top_title">회의 자가진단 CheckList</div>
                    <div className="top_description">
                        <p>회의를 잘 마치셨나요?</p>
                        <p>
                            회의를 진행하는 시간만큼 회의에 대해 평가하고 회고하는 시간도 중요합니다. 앞으로 더 효율적인
                            회의를 진행하기 위해 팀원들과 이번 회의를 평가해볼까요?
                        </p>
                    </div>
                </TopContainer>
                <BodyContainer>
                    {checkPut || checklistReslut ? (
                        <CheckListContainer>
                            <div>
                                <div className="checklist_title">나의 오너십(Ownership)은? (30점) </div>
                                <div className="checklist">
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (check1) {
                                                    setCheck1(null)
                                                } else {
                                                    setCheck1('Y')
                                                }
                                            }}
                                        />
                                        나는, 회의에서 무엇에 대한 결정을 내려야하는지 명확히 알고 있었어요.
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (check2) {
                                                    setCheck2(null)
                                                } else {
                                                    setCheck2('Y')
                                                }
                                            }}
                                        />
                                        나는, 이 회의에서 목적에 부합하는 이야기 흐름을 유지되도록 노력했어요.
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (check3) {
                                                    setCheck3(null)
                                                } else {
                                                    setCheck3('Y')
                                                }
                                            }}
                                        />
                                        나는, 모든 참여자가 회의 목적이 무엇인지 알게하려고 노력했어요.
                                    </label>
                                </div>
                            </div>
                            <div style={{ marginTop: '36px' }}>
                                <div className="checklist_title">참여자들의 참여도는? (30점)</div>
                                <div className="checklist">
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (check4) {
                                                    setCheck4(null)
                                                } else {
                                                    setCheck4('Y')
                                                }
                                            }}
                                        />
                                        참여자들은, 경직되지 않은 분위기에서 회의에 참여할 수 있었어요.
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (check5) {
                                                    setCheck5(null)
                                                } else {
                                                    setCheck5('Y')
                                                }
                                            }}
                                        />
                                        참여자들은, 모두 골고루 발언의 기회를 가졌어요.
                                    </label>
                                </div>
                            </div>
                            <div style={{ marginTop: '36px' }}>
                                <div className="checklist_title">나의 오너십(Ownership)은? (30점)</div>
                                <div className="checklist">
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (check6) {
                                                    setCheck6(null)
                                                } else {
                                                    setCheck6('Y')
                                                }
                                            }}
                                        />
                                        회의가, 제 시간에 결과물을 도출하고 끝났어요.
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (check7) {
                                                    setCheck7(null)
                                                } else {
                                                    setCheck7('Y')
                                                }
                                            }}
                                        />
                                        회의가, 대체로 맴돌거나 주제에서 벗어나지 않고 진행되었어요.
                                    </label>
                                </div>
                            </div>
                            <div style={{ marginTop: '36px' }}>
                                <div className="checklist_title">참여자들의 참여도는? (30점)</div>
                                <div className="checklist">
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (check8) {
                                                    setCheck8(null)
                                                } else {
                                                    setCheck8('Y')
                                                }
                                            }}
                                        />
                                        결정사항(또는 next action item)이 도출되었어요.
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (check9) {
                                                    setCheck9(null)
                                                } else {
                                                    setCheck9('Y')
                                                }
                                            }}
                                        />
                                        결정사항의 실행 주체가 정해졌어요.
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (check10) {
                                                    setCheck10(null)
                                                } else {
                                                    setCheck10('Y')
                                                }
                                            }}
                                        />
                                        결정사항의 실행 일정이 정해졌어요.
                                    </label>
                                </div>
                            </div>
                        </CheckListContainer>
                    ) : (
                        // 여기서부터 변화
                        <CheckListContainer>
                            <div>
                                <div className="checklist_title">나의 오너십(Ownership)은? (30점)</div>
                                <div className="checklist">
                                    <label
                                        style={{
                                            color: disable || !checkData?.check1 ? '#87878b' : 'black',
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            readOnly
                                            checked={checkData?.check1 || checkPut ? true : null}
                                        />
                                        나는, 회의에서 무엇에 대한 결정을 내려야하는지 명확히 알고 있었어요.
                                    </label>
                                    <label
                                        style={{
                                            color: disable || !checkData?.check2 ? '#87878b' : 'black',
                                        }}
                                    >
                                        <input type="checkbox" readOnly checked={checkData?.check2 ? true : null} />
                                        나는, 이 회의에서 목적에 부합하는 이야기 흐름을 유지되도록 노력했어요.
                                    </label>
                                    <label
                                        style={{
                                            color: disable || !checkData?.check3 ? '#87878b' : 'black',
                                        }}
                                    >
                                        <input type="checkbox" readOnly checked={checkData?.check3 ? true : null} />
                                        나는, 모든 참여자가 회의 목적이 무엇인지 알게하려고 노력했어요.
                                    </label>
                                </div>
                            </div>
                            <div style={{ marginTop: '36px' }}>
                                <div className="checklist_title">참여자들의 참여도는? (30점)</div>
                                <div className="checklist">
                                    <label
                                        style={{
                                            color: disable || !checkData?.check4 ? '#87878b' : 'black',
                                        }}
                                    >
                                        <input type="checkbox" readOnly checked={checkData?.check4 ? true : null} />
                                        참여자들은, 경직되지 않은 분위기에서 회의에 참여할 수 있었어요.
                                    </label>
                                    <label
                                        style={{
                                            color: disable || !checkData?.check5 ? '#87878b' : 'black',
                                        }}
                                    >
                                        <input type="checkbox" readOnly checked={checkData?.check5 ? true : null} />
                                        참여자들은, 모두 골고루 발언의 기회를 가졌어요.
                                    </label>
                                </div>
                            </div>
                            <div style={{ marginTop: '36px' }}>
                                <div className="checklist_title">나의 오너십(Ownership)은? (30점)</div>
                                <div className="checklist">
                                    <label
                                        style={{
                                            color: disable || !checkData?.check6 ? '#87878b' : 'black',
                                        }}
                                    >
                                        <input type="checkbox" readOnly checked={checkData?.check6 ? true : null} />
                                        회의가, 제 시간에 결과물을 도출하고 끝났어요.
                                    </label>
                                    <label
                                        style={{
                                            color: disable || !checkData?.check7 ? '#87878b' : 'black',
                                        }}
                                    >
                                        <input type="checkbox" readOnly checked={checkData?.check7 ? true : null} />
                                        회의가, 대체로 맴돌거나 주제에서 벗어나지 않고 진행되었어요.
                                    </label>
                                </div>
                            </div>
                            <div style={{ marginTop: '36px' }}>
                                <div className="checklist_title">참여자들의 참여도는? (30점)</div>
                                <div className="checklist">
                                    <label
                                        style={{
                                            color: disable || !checkData?.check8 ? '#87878b' : 'black',
                                        }}
                                    >
                                        <input type="checkbox" readOnly checked={checkData?.check8 ? true : null} />
                                        결정사항(또는 next action item)이 도출되었어요.
                                    </label>
                                    <label
                                        style={{
                                            color: disable || !checkData?.check9 ? '#87878b' : 'black',
                                        }}
                                    >
                                        <input type="checkbox" readOnly checked={checkData?.check9 ? true : null} />
                                        결정사항의 실행 주체가 정해졌어요.
                                    </label>
                                    <label
                                        style={{
                                            color: disable || !checkData?.check10 ? '#87878b' : 'black',
                                        }}
                                    >
                                        <input type="checkbox" readOnly checked={checkData?.check10 ? true : null} />
                                        결정사항의 실행 일정이 정해졌어요.
                                    </label>
                                </div>
                            </div>
                        </CheckListContainer>
                    )}
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
                                        setCheckPut(false)
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
                                    <p className="checklist_after_header_title">이번 회의 자가진단 결과는?</p>
                                    <p className="checklist_after_header_description">{plusData}점</p>
                                </div>
                                <ChartContainer>
                                    <RadarChart data={resultdata} />
                                </ChartContainer>
                                <div className="checklist_after_footer">{/* {resultText()} */}</div>
                            </CheckListReslutAfterContainer>
                        )}
                    </ResultContainer>
                </BodyContainer>
                {checklistReslut ? (
                    <FooterContainer>
                        <button
                            className="none-btn"
                            onClick={() => {
                                onClose()
                            }}
                        >
                            나중에 할게요
                        </button>
                        <button className="success-btn" style={{ backgroundColor: '#bac0cc' }}>
                            자가진단 완료
                        </button>
                    </FooterContainer>
                ) : (
                    <FooterContainer>
                        <button
                            className="none-btn"
                            onClick={() => {
                                setDisable(false)
                                // setCheckResult(true)
                                setChecklistResult(true)
                                setCheckPut(true)
                            }}
                        >
                            다시 할게요
                        </button>
                        <button
                            className="success-btn"
                            onClick={() => {
                                onClose()
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            자가진단 완료
                        </button>
                    </FooterContainer>
                )}
            </ModalContainer>
        </Container>
    )
}

export default CheckListModal
