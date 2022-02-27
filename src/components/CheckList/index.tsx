import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useOnClickOutside from '@hooks/useOnClickOutside'

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
        width: 120px;
        flex-grow: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        border: solid 1px #d6d6d7;
        background-color: #fff;
    }
`
interface Props {
    onClose: () => void
}
function CheckListModal({ onClose }: Props) {
    const ref = useRef<any>()
    const [checklistReslut, setChecklistResult] = useState(false)
    useOnClickOutside(ref, () => {
        onClose()
    })
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
                                <label>
                                    <input
                                        className="checkcomm"
                                        type="checkbox"
                                        readOnly
                                        value=""
                                        checked
                                    />
                                    나는, 회의에서 무엇에 대한 결정을
                                    내려야하는지 명확히 알고 있었어요.
                                </label>
                                <label>
                                    <input type="checkbox" readOnly value="" />
                                    나는, 이 회의에서 목적에 부합하는 이야기
                                    흐름을 유지되도록 노력했어요.
                                </label>
                                <label>
                                    <input type="checkbox" readOnly value="" />
                                    나는, 모든 참여자가 회의 목적이 무엇인지
                                    알게하려고 노력했어요.
                                </label>
                            </div>
                        </div>
                        <div style={{ marginTop: '36px' }}>
                            <div className="checklist_title">
                                참여자들의 참여도는? (20점)
                            </div>
                            <div className="checklist">
                                <label>
                                    <input type="checkbox" readOnly value="" />
                                    참여자들은, 경직되지 않은 분위기에서 회의에
                                    참여할 수 있었어요.
                                </label>
                                <label>
                                    <input type="checkbox" readOnly value="" />
                                    참여자들은, 모두 골고루 발언의 기회를
                                    가졌어요.
                                </label>
                            </div>
                        </div>
                        <div style={{ marginTop: '36px' }}>
                            <div className="checklist_title">
                                나의 오너십(Ownership)은? (30점)
                            </div>
                            <div className="checklist">
                                <label>
                                    <input type="checkbox" readOnly value="" />
                                    회의가, 제 시간에 결과물을 도출하고
                                    끝났어요.
                                </label>
                                <label>
                                    <input type="checkbox" readOnly value="" />
                                    회의가, 대체로 맴돌거나 주제에서 벗어나지
                                    않고 진행되었어요.
                                </label>
                            </div>
                        </div>
                        <div style={{ marginTop: '36px' }}>
                            <div className="checklist_title">
                                참여자들의 참여도는? (30점)
                            </div>
                            <div className="checklist">
                                <label>
                                    <input type="checkbox" readOnly value="" />
                                    결정사항(또는 next action item)이
                                    도출되었어요.
                                </label>
                                <label>
                                    <input type="checkbox" readOnly value="" />
                                    결정사항의 실행 주체가 정해졌어요.
                                </label>
                                <label>
                                    <input type="checkbox" readOnly value="" />
                                    결정사항의 실행 일정이 정해졌어요.
                                </label>
                            </div>
                        </div>
                    </CheckListContainer>
                    <ResultContainer>
                        {!checklistReslut ? (
                            <CheckListReslutBeforeContainer>
                                <div className="result_info">
                                    Checklist 선택이 완료되었다면 아래 버튼을
                                    클릭해주세요!
                                </div>
                                <button
                                    className="result_btn"
                                    onClick={() => {
                                        setChecklistResult(true)
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
                                        75점
                                    </p>
                                </div>
                                <ChartContainer>
                                    <RadarChart />
                                </ChartContainer>
                                <div className="checklist_after_footer">
                                    <div>
                                        그럭저럭 효율적인 회의였네요! 부족한
                                        부분이 무엇이었는지
                                    </div>
                                    <div>
                                        그래프에서 확인해보고 다음 번 회의 때 그
                                        부분을 개선해보아요!
                                    </div>
                                </div>
                            </CheckListReslutAfterContainer>
                        )}
                    </ResultContainer>
                </BodyContainer>
                <FooterContainer>
                    <button>나중에 할게요</button>
                    <button>자가진단 완료</button>
                </FooterContainer>
            </ModalContainer>
        </Container>
    )
}

export default CheckListModal
