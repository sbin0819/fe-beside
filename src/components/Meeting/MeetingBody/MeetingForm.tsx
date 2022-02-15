import React, { useState } from 'react'
import { Svg, TextArea } from '@components/common'
import { Notepad, noteViewBox } from '@svgs/Notepad'
import { Pin, pinViewBox } from '@svgs/Pin'
import { ActionItem, actionItemViewBox } from '@svgs/ActionItem'
import { Add, addViewBox } from '@svgs/Add'
import styled from 'styled-components'

import { nanoid } from '@reduxjs/toolkit'

const MenuTopContainer = styled.div`
    height: 24px;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #000;
`

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
    const [areaForm, setAreaForm] = useState({ text1: '', text2: '' })
    const actionInitId = nanoid()
    const [actionsForm, setActionsForm] = useState({
        [actionInitId]: { id: actionInitId, title: '', authors: '', date: '' },
    })

    const onChange = (e) => {
        const { value, name } = e.target
        let rValue = value.replace(/\- /gi, ' · ')
        setAreaForm((prev) => ({ ...prev, [name]: rValue }))
    }

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
            <MenuTopContainer>아젠다 2의 내용은 무엇이다.</MenuTopContainer>
            <MenuContainer height={150}>
                <Header>
                    <div>
                        <Svg viewBox={noteViewBox} width={'20'} height={'18'}>
                            <Notepad />
                        </Svg>
                    </div>
                    <div>논의 내용</div>
                </Header>
                <Body>
                    <TextArea
                        name="text1"
                        value={areaForm.text1}
                        placeholder="논의할 내용에 대해 작성해주세요."
                        onChange={onChange}
                    />
                </Body>
            </MenuContainer>
            <MenuContainer height={140}>
                <Header>
                    <div>
                        <Svg viewBox={pinViewBox} width={'20'} height={'18'}>
                            <Pin />
                        </Svg>
                    </div>
                    <div>결정된 사항</div>
                </Header>
                <Body>
                    <TextArea
                        name="text2"
                        value={areaForm.text2}
                        placeholder="결정된 사항을 작성해주세요"
                        onChange={onChange}
                    />
                </Body>
            </MenuContainer>
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
