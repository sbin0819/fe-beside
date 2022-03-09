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
    input[type='date']::before {
        content: attr(data-placeholder);
        width: 100%;
        color: gray;
    }
    input[type='date']:focus::before {
        display: none;
    }
    input[type='date']:valid::before {
        display: none;
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

function ActionItems({
    agendaId,
    actionsData,
}: {
    agendaId: number
    actionsData: ActionItems[]
}) {
    const { agendaMutate } = actionsSWR(agendaId)
    const [innerActions, setActions] = useState<{ [key: number]: ActionItems }>(
        {}
    )
    const addAction = async () => {
        await axios.post('/api/action/', {
            agenda_id: agendaId,
            dead_line: null,
        })
        agendaMutate()
    }
    const deleteAction = async (id) => {
        await axios.delete(`/api/action/${id}`)
        agendaMutate()
    }

    const updateAction = async () => {
        const actions = Object.values(innerActions)
        await axios.patch('/api/action/', actions)
    }

    const onChange = (e, id) => {
        const { value, name } = e.target
        setActions((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [name]: value,
            },
        }))
    }

    const onChangeDate = (e, id) => {
        const { value, name } = e.target
        setActions((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [name]: moment(value).format('YYYY-MM-DD') + ' 12:12:12',
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
                        <Svg
                            viewBox={actionItemViewBox}
                            width={'20'}
                            height={'18'}
                        >
                            <ActionItem />
                        </Svg>
                    </div>
                    <div>액션 아이템</div>
                </Header>
                <Body>
                    <ItemList>
                        {Object.entries(innerActions)?.map(
                            ([key, value], idx) => (
                                <Item key={key}>
                                    <div style={{ display: 'flex' }}>
                                        <input
                                            type="text"
                                            placeholder="액션 아이템을 작성해주세요"
                                            value={value.action_title}
                                            name="action_title"
                                            onChange={(e) => {
                                                onChange(e, value.action_id)
                                            }}
                                        />
                                        {idx !== 0 && (
                                            <div
                                                onClick={() => {
                                                    deleteAction(
                                                        value.action_id
                                                    )
                                                }}
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
                                    <div
                                        style={{ display: 'flex', gap: '8px' }}
                                    >
                                        <Svg
                                            viewBox={peopleViewBox}
                                            width={'16'}
                                            height={'16'}
                                        >
                                            <People />
                                        </Svg>
                                        <input
                                            type="text"
                                            placeholder="담당자"
                                            value={value.person}
                                            name="person"
                                            onChange={(e) => {
                                                onChange(e, value.action_id)
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{ display: 'flex', gap: '8px' }}
                                    >
                                        <Svg
                                            viewBox={calendarViewBox}
                                            width={'20'}
                                            height={'18'}
                                        >
                                            <Calendar />
                                        </Svg>
                                        <input
                                            type="date"
                                            data-placeholder="마감기한"
                                            value={value.dead_line}
                                            name="dead_line"
                                            readOnly
                                            // onChange={(e) => {
                                            //     onChangeDate(e, value.action_id)
                                            // }}
                                        />
                                    </div>
                                </Item>
                            )
                        )}
                    </ItemList>
                    <AddButton
                        onClick={() => {
                            addAction()
                        }}
                    >
                        <div>
                            <Svg
                                viewBox={addViewBox}
                                width={'20'}
                                height={'18'}
                            >
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
