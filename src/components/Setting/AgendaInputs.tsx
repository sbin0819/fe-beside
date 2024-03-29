import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { StyledInput, InputInfoContainer } from './style'
import { Svg } from '@common'
import { closeViewBox, Close } from '@svgs/Close'
import { AgendaForms } from './useSetting'
import { useRouter } from 'next/router'

const AgendaContainer = styled.div`
    /* margin-top: 32px; */
    gap: 24px;
    margin-bottom: 32px;

    .agenda_inputs {
        position: relative;
        display: flex;
        /* justify-content: space-between; */
        .agenda_input {
            width: 832px;
            margin-right: 24px;
        }
        .time_input {
            width: 168px;
        }
        .close {
            position: absolute;
            right: 0;
            top: 15px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-left: 17px;
        }
    }
`

const AgendaAddContainer = styled.div`
    position: relative;
    top: -16px;
    display: inline-block;
    padding-left: 20px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    text-align: left;
    color: rgba(60, 60, 67, 0.6);
    cursor: pointer;
`

const defaultAgendaForm = {
    // agenda_id: nanoid(),
    // order_number: 1,
    agenda_title: '',
    setting_time: 0,
    validation: {
        agenda_title: {
            error: false,
            message: '',
            focus: false,
        },
        setting_time: {
            error: false,
            message: '',
            focus: false,
        },
    },
}

const InputInfoContainer3 = styled.div<{ isInValid?: boolean }>`
    position: absolute;
    padding: 4px 4px;
    color: ${({ isInValid }) => (isInValid ? '#e24646' : '#748298')};
    font-size: 12px;
`

function AgendaInputs({
    agendaForms,
    setAgendagendaForms,
    remainTime,
    setRemainTime,
    handleModalOpen,
}: {
    agendaForms: AgendaForms
    setAgendagendaForms: any
    remainTime: number
    setRemainTime: any
    handleModalOpen: () => void
}) {
    const formOrderRef = useRef(1)
    // const currRef = useRef('ready')
    // const [offsetTime, setOffsetTime] = useState(0)
    // const [currTime, setCurrTime] = useState(0)
    const [focusedOrder, setFoucusedOrder] = useState(1)
    const remainTimeValidation = (name, order_number) => {
        setAgendagendaForms((prev) => ({
            ...prev,
            [order_number]: {
                ...prev[order_number],
                validation: {
                    [name]: '',
                    ...prev[order_number].validation,
                    [name]: {
                        ...prev[order_number].validation[name],
                        focus: false,
                        error: true,
                        message: '허용된 시간 초과',
                    },
                },
            },
        }))
    }
    const onChange = (e, order_number) => {
        const { name, value, type } = e.target
        setFoucusedOrder(order_number)
        // if (focusedOrder !== formOrderRef.current) {
        //     if (currRef.current == 'ready') {
        //         setCurrTime(agendaForms[focusedOrder].setting_time)
        //     }
        //     setOffsetTime(value)
        // }

        if (name === 'setting_time') {
            if (remainTime - value < 0) {
                remainTimeValidation(name, order_number)
            }
        }
        setAgendagendaForms((prev) => ({
            ...prev,
            [order_number]: {
                ...prev[order_number],
                [name]: type === 'text' ? value : value === '' ? '' : +value,
            },
        }))
    }
    const onDelete = (order_number) => {
        const newForm = Object.entries(agendaForms).reduce((acc, curr) => {
            const [key, obj] = curr
            if (obj.order_number == order_number) {
                return acc
            }
            if (+key > +order_number) {
                const newOrder = +key - 1
                obj.order_number = newOrder
                acc[newOrder] = obj
                return acc
            }
            acc[key] = obj
            return acc
        }, {})
        // formOrderRef 초기화
        formOrderRef.current = Object.keys(agendaForms).length - 1
        setAgendagendaForms(newForm)
        // increaseRemainTime(order_number)
    }

    const prevTime = () => {
        return agendaForms[formOrderRef.current - 1]?.setting_time
            ? agendaForms[formOrderRef.current - 1]?.setting_time
            : 0
    }

    const increaseRemainTime = (order_number) => {
        if (order_number === 1) {
            setRemainTime(59)
        } else {
            setRemainTime(
                (prev) => +prev + +agendaForms[order_number].setting_time
            )
        }
    }

    const decreaseRemainTime = (order_number) => {
        setRemainTime((prev) => +prev - +agendaForms[order_number].setting_time)
    }

    const addAgendaInput = () => {
        if (
            !agendaForms[formOrderRef.current]?.setting_time ||
            agendaForms[formOrderRef.current]?.agenda_title === ''
        ) {
            handleModalOpen()
            return
        }
        // if (remainTime - agendaForms[formOrderRef.current]?.setting_time < 0) {
        //     alert('허용 시간을 초과 했습니다.')
        //     return
        // }

        formOrderRef.current = Object.keys(agendaForms).length + 1
        setAgendagendaForms((prev) => ({
            ...prev,
            [formOrderRef.current]: {
                ...defaultAgendaForm,
                agenda_id: nanoid(),
                order_number: formOrderRef.current,
            },
        }))
        // decreaseRemainTime()
    }

    const onFocus = (e, order_number) => {
        const { name } = e.target
        let messages =
            name === 'agenda_title'
                ? `59mins는 모든 회의를 1시간 이내로 끝내는 걸 목표로 해요!`
                : `${remainTime}분까지 입력 가능`
        setAgendagendaForms((prev) => ({
            ...prev,
            [order_number]: {
                ...prev[order_number],
                validation: {
                    ...prev[order_number].validation,
                    [name]: {
                        ...prev[order_number].validation[name],
                        focus: true,
                        error: false,
                        message: messages,
                    },
                },
            },
        }))
    }
    const onBlur = (e, order_number) => {
        const { name } = e.target
        setAgendagendaForms((prev) => ({
            ...prev,
            [order_number]: {
                ...prev[order_number],
                validation: {
                    ...prev[order_number]?.validation,
                    [name]: {
                        ...prev[order_number]?.validation[name],
                        focus: false,
                        error: false,
                        message: '',
                    },
                },
            },
        }))
    }

    // 허용된 시간이 초과 되고 다시 input을 작성하기 위한 로직
    useEffect(() => {
        if (agendaForms[focusedOrder]?.validation?.setting_time?.error) {
            agendaForms[focusedOrder].setting_time = 0
            agendaForms[focusedOrder].validation.setting_time.error = false
            agendaForms[focusedOrder].validation.setting_time.message = ''
        }
    }, [agendaForms[focusedOrder]?.validation?.setting_time?.error])

    return (
        <>
            {Object.entries(agendaForms)
                .sort((a, b) => +a[0] - +b[0])
                .map(([k, form], idx) => (
                    <React.Fragment key={form.agenda_id}>
                        <AgendaContainer>
                            <div className="agenda_inputs">
                                <div style={{ position: 'relative' }}>
                                    <StyledInput
                                        type="text"
                                        className="agenda_input"
                                        name="agenda_title"
                                        placeholder="AGENDA"
                                        value={form.agenda_title}
                                        onChange={(e) =>
                                            onChange(e, form.order_number)
                                        }
                                        isInValid={
                                            form?.validation?.agenda_title.error
                                        }
                                        isFocus={
                                            form?.validation?.agenda_title.focus
                                        }
                                        onFocus={(e) => {
                                            onFocus(e, form.order_number)
                                        }}
                                        onBlur={(e) => {
                                            onBlur(e, form.order_number)
                                        }}
                                    />
                                    {(form.validation?.agenda_title?.error ||
                                        form.validation?.agenda_title
                                            ?.focus) && (
                                        <InputInfoContainer
                                            isInValid={
                                                form.validation?.agenda_title
                                                    .error
                                            }
                                        >
                                            {
                                                form.validation?.agenda_title
                                                    .message
                                            }
                                        </InputInfoContainer>
                                    )}
                                </div>
                                <div>
                                    <div style={{ position: 'relative' }}>
                                        <StyledInput
                                            className="time_input"
                                            type="text"
                                            name="setting_time"
                                            placeholder="목표시간"
                                            id={`${form.order_number}-time_input`}
                                            value={
                                                form?.validation?.setting_time
                                                    ?.error
                                                    ? ''
                                                    : parseInt(
                                                          form.setting_time
                                                              .toString()
                                                              .replace(
                                                                  /(^0+)/,
                                                                  ''
                                                              )
                                                      ) || ''
                                            }
                                            // disabled={
                                            //     formOrderRef.current !== idx + 1
                                            //         ? true
                                            //         : false
                                            // }
                                            onChange={(e) =>
                                                onChange(e, form.order_number)
                                            }
                                            isInValid={
                                                form?.validation?.setting_time
                                                    ?.error
                                            }
                                            isFocus={
                                                form?.validation?.setting_time
                                                    .focus
                                            }
                                            onFocus={(e) => {
                                                onFocus(e, form.order_number)
                                                increaseRemainTime(
                                                    form.order_number
                                                )
                                            }}
                                            onBlur={(e) => {
                                                onBlur(e, form.order_number)
                                                decreaseRemainTime(
                                                    form.order_number
                                                )
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Tab') {
                                                    onBlur(e, form.order_number)
                                                    addAgendaInput()
                                                }
                                            }}
                                        />
                                    </div>
                                    {(form.validation?.setting_time?.error ||
                                        form.validation?.setting_time
                                            ?.focus) && (
                                        <InputInfoContainer3
                                            isInValid={
                                                form.validation?.setting_time
                                                    .error
                                            }
                                        >
                                            {
                                                form.validation?.setting_time
                                                    .message
                                            }
                                        </InputInfoContainer3>
                                    )}
                                    {form?.order_number !== 1 && (
                                        <div
                                            className="close"
                                            onClick={() =>
                                                onDelete(form?.order_number)
                                            }
                                        >
                                            <Svg
                                                viewBox={closeViewBox}
                                                width={'20'}
                                                height={'18'}
                                            >
                                                <Close />
                                            </Svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </AgendaContainer>
                        {/* formOrderRef.current == idx + 1 */}
                        {Object.entries(agendaForms).length == idx + 1 && (
                            <AgendaAddContainer onClick={addAgendaInput}>
                                + 액션 아이템 추가
                            </AgendaAddContainer>
                        )}
                    </React.Fragment>
                ))}
        </>
    )
}

export default AgendaInputs
