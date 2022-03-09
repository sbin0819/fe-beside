import { useEffect, useState } from 'react'
import { Svg } from '@components/common'
import { ActionItem, actionItemViewBox } from '@svgs/ActionItem'
import { Add, addViewBox } from '@svgs/Add'
import styled from 'styled-components'

import { nanoid } from '@reduxjs/toolkit'
import useMeeting from '@store/meeting/useMeeting'
import { AgendaState } from '@store/meeting/meetingSlice'
import useMeetingActions from '@store/meeting/useMeetingActions'
import axios from '@axios'

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

function MeetingForm() {
    const actionInitId = nanoid()
    const [actionsForm, setActionsForm] = useState({
        [actionInitId]: { id: actionInitId, title: '', authors: '', date: '' },
    })

    const addActionItems = () => {
        const id = nanoid()
        setActionsForm((prev) => ({
            ...prev,
            [id]: {
                id: id,
                title: '',
                authors: '',
                date: '',
            },
        }))
    }

    const onChangeActionItems = (id) => (e) => {
        const { value, name } = e.target
        setActionsForm((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [name]: value,
            },
        }))
    }

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
                        {Object.entries(actionsForm).map(([key, value]) => (
                            <Item key={key}>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="액션 아이템을 작성해주세요"
                                        value={value.title}
                                        name="title"
                                        onChange={onChangeActionItems(key)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="A 담당자"
                                        value={value.authors}
                                        name="authors"
                                        onChange={onChangeActionItems(key)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="date"
                                        data-placeholder="B 마감기한"
                                        value={value.date}
                                        name="date"
                                        readOnly
                                    />
                                </div>
                            </Item>
                        ))}
                    </ItemList>
                    <AddButton onClick={() => addActionItems()}>
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

export default MeetingForm
