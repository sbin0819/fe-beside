import { useEffect, useState } from 'react'
import { Svg } from '@components/common'
import { ActionItem, actionItemViewBox } from '@svgs/ActionItem'
import { Add, addViewBox } from '@svgs/Add'
import { Close, closeViewBox } from '@svgs/Close'
import { People, peopleViewBox } from '@svgs/People'
import { Calendar, calendarViewBox } from '@svgs/Calendar'
import styled from 'styled-components'

import axios from '@axios'
import { actionsSWR } from '@api/actions'
import moment from 'moment'

const MenuContainer = styled.div<{ height?: number }>`
    margin-top: 20px;
    min-height: ${({ height }) => (height ? height : 120)}px;
`

const Header = styled.div`
    display: flex;
    margin-bottom: 14px;
`

const Body = styled.div`
    width: 100%;
    input {
        width: 100%;
    }
`

const ItemList = styled.div`
    margin: 12px 0;
`

const Item = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 103px;
    padding: 16px 16px 17px 20px;
    border: solid 1px #f1f1f1;
    background-color: #fff;
    /* input[type='date']::before {
        content: attr(data-placeholder);
        width: 100%;
        color: gray;
    } */
    /* input[type='date']:focus::before {
        display: none;
    }
    input[type='date']:valid::before {
        display: none;
    } */
`

const StyledDateInput = styled.div<{ isValue?: boolean }>`
    position: relative;
    input[type='date'] {
        color: ${({ isValue }) => (isValue ? 'inherit' : '#c0c0c2')};
    }
    input[type='date'] {
    }
    input[type='date']::-webkit-inner-spin-button,
    input[type='date']::-webkit-calendar-picker-indicator {
        background: transparent;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
    }
`

const AddButton = styled.div`
    display: flex;
    align-items: center;
    margin-top: 13px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(60, 60, 67, 0.6);
    cursor: pointer;
`

interface ActionItems {
    action_id: number
    action_title: string
    agenda_id: string
    dead_line: any
    person: string
}

function ActionItems({ agendaId, actionsData }: { agendaId: number; actionsData: ActionItems[] }) {
    const { agendaMutate } = actionsSWR(agendaId)
    const [currentActionIdIdx, setCurrentActionIdIdx] = useState(null)
    const [currentActionId, setCurrentActionId] = useState(null)
    const [innerActions, setActions] = useState<{ [key: number]: ActionItems }>({})
    const addAction = async () => {
        await axios.post('/api/action/', {
            agenda_id: agendaId,
            dead_line: null,
        })
        setCurrentActionId(null)
        setCurrentActionIdIdx(null)
        agendaMutate()
    }
    const deleteAction = async (id) => {
        await axios.delete(`/api/action/${id}`)
        // delete 시 currentActionId, currentActionIdidx null
        setCurrentActionId(null)
        setCurrentActionIdIdx(null)

        agendaMutate()
    }

    const updateAction = async () => {
        if (currentActionId !== null && currentActionIdIdx !== null) {
            // 빈 값 일 때도 동작 해야함
            const targetAction = Object?.values(innerActions)[currentActionIdIdx]
            const validAction = Object?.entries(targetAction)
                .filter(([k, v]) => {
                    if (k !== 'agenda_id') return true
                })
                .reduce((acc, curr) => {
                    acc[curr[0]] = curr[1]
                    return acc
                }, {})

            await axios.patch(`/api/action/${currentActionId}/`, validAction)
        }
    }

    const onChange = (e, id, idx) => {
        const { value, name } = e.target
        if (id !== currentActionId) {
            setCurrentActionId(id)
        }
        if (idx !== currentActionIdIdx) {
            setCurrentActionIdIdx(idx)
        }
        setActions((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [name]:
                    name === 'dead_line' ? moment(value).format('YYYY-MM-DD') + ' 12:12:12' : value,
            },
        }))
    }

    useEffect(() => {
        const cleanTime = setTimeout(() => {
            updateAction()
        }, 300)
        return () => {
            clearTimeout(cleanTime)
        }
    }, [onChange])

    useEffect(() => {
        const actionObj = actionsData.reduce((acc, curr) => {
            acc[curr.action_id] = curr
            return acc
        }, {})
        setActions(actionObj)
    }, [actionsData])

    return (
        <>
            <MenuContainer>
                <Header>
                    <div>
                        <Svg viewBox={actionItemViewBox} width={'20'} height={'18'}>
                            <ActionItem />
                        </Svg>
                    </div>
                    <div>액션 아이템</div>
                </Header>
                <Body>
                    <ItemList>
                        {Object.entries(innerActions)?.map(([key, value], idx) => (
                            <Item key={key}>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="text"
                                        placeholder="액션 아이템을 작성해주세요"
                                        value={value.action_title}
                                        name="action_title"
                                        onChange={(e) => {
                                            onChange(e, value.action_id, idx)
                                        }}
                                    />
                                    {idx !== 0 && (
                                        <div
                                            onClick={() => {
                                                deleteAction(value.action_id)
                                            }}
                                        >
                                            <Svg viewBox={closeViewBox} width={'20'} height={'18'}>
                                                <Close />
                                            </Svg>
                                        </div>
                                    )}
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Svg viewBox={peopleViewBox} width={'16'} height={'16'}>
                                        <People />
                                    </Svg>
                                    <input
                                        type="text"
                                        placeholder="담당자"
                                        value={value.person}
                                        name="person"
                                        onChange={(e) => {
                                            onChange(e, value.action_id, idx)
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Svg viewBox={calendarViewBox} width={'20'} height={'18'}>
                                        <Calendar />
                                    </Svg>
                                    <StyledDateInput isValue={value.dead_line ? true : false}>
                                        <input
                                            type="date"
                                            // data-placeholder="마감기한"
                                            min={moment(new Date()).format('YYYY-MM-DD')}
                                            value={moment(value.dead_line).format('YYYY-MM-DD')}
                                            name="dead_line"
                                            onChange={(e) => {
                                                onChange(e, value.action_id, idx)
                                            }}
                                        />
                                    </StyledDateInput>
                                </div>
                            </Item>
                        ))}
                    </ItemList>
                    <AddButton
                        onClick={() => {
                            addAction()
                        }}
                    >
                        <div>
                            <Svg viewBox={addViewBox} width={'20'} height={'18'}>
                                <Add />
                            </Svg>
                        </div>
                        <div>액션 아이템 추가</div>
                    </AddButton>
                </Body>
            </MenuContainer>
        </>
    )
}

export default ActionItems
