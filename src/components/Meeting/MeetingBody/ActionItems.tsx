import { Svg } from '@components/common'
import { ActionItem, actionItemViewBox } from '@svgs/ActionItem'
import { Add, addViewBox } from '@svgs/Add'
import styled from 'styled-components'

import axios from '@axios'
import { actionsSWR } from '@api/actions'

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
    const addAgenda = async () => {
        await axios.post('/api/action/', {
            agenda_id: agendaId,
            dead_line: null,
        })
        agendaMutate()
    }
    const deleteAgenda = async (id) => {
        await axios.delete(`/api/action/${id}`)
        agendaMutate()
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
                        {actionsData.map((el, idx) => (
                            <Item key={el.action_id}>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="액션 아이템을 작성해주세요"
                                        value={el.action_title}
                                        name="action_title"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="A 담당자"
                                        value={el.person}
                                        name="person"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="date"
                                        data-placeholder="B 마감기한"
                                        value={el.dead_line}
                                        name="dead_line"
                                        readOnly
                                    />
                                </div>
                            </Item>
                        ))}
                    </ItemList>
                    <AddButton
                        onClick={() => {
                            addAgenda()
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
