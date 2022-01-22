import React, { useState, useRef, useEffect } from 'react'
import { Header } from '@common'
import styled from 'styled-components'
import { nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const AgendaForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 800px;
    border: solid 1px tomato;
    padding: 20px 40px;
    gap: 20px;
`

const AgendaInputContainer = styled.div`
    display: flex;
    gap: 12px;
`
const StyledInput = styled.input`
    flex: 1;
    height: 52px;
    border: 1px solid tomato;
    border-radius: 12px;
`

const StyledButton = styled.button`
    height: 38px;
    border: 1px solid tomato;
`

interface Form {
    id: string
    agenda: string
    duration: number
    order: number
    created_at: Date
    updated_at?: Date
}
interface Forms {
    [key: string]: Form
}

// array to obj
function Setting({ init }: { init: boolean }) {
    // id 세팅 페이지 // order 추가
    const formOrderRef = useRef(1)
    const [form, setForm] = useState<Forms>(
        init && {
            1: {
                id: nanoid(),
                agenda: '',
                duration: 0,
                order: 1,
                created_at: new Date(),
                updated_at: null,
            },
        }
    )
    const onChange = (order) => (e) => {
        const { name, value, type } = e.target
        setForm((prev) => ({
            ...prev,
            [order]: {
                ...prev[order],
                [name]: type === 'number' ? +value : value,
                updated_at: new Date(),
            },
        }))
    }

    const onDelete = (order) => () => {
        const newForm = Object.entries(form).reduce((acc, curr) => {
            const [key, obj] = curr
            if (obj.order == order) {
                return acc
            }
            if (+key > +order) {
                const newOrder = +key - 1
                obj.order = newOrder
                acc[newOrder] = obj
                return acc
            }
            acc[key] = obj
            return acc
        }, {})
        // formOrderRef 초기화
        formOrderRef.current = Object.keys(form).length - 1
        setForm(newForm)
    }

    const addAgendaInput = () => {
        // next order
        formOrderRef.current += 1
        setForm((prev) => ({
            ...prev,
            [formOrderRef.current]: {
                id: nanoid(),
                agenda: '',
                duration: 0,
                order: formOrderRef.current,
                created_at: new Date(),
            },
        }))
    }

    useEffect(() => {
        if (!init) {
            // api 기존 input 데이터
            // response [{..., order:1}, {..., order:2}]
            const fetch = async () => {
                const response = await axios.get(
                    'http://localhost:3000/api/setting'
                )
                setForm(response.data)
            }
            fetch()
        }
    }, [])

    return (
        <>
            <Header />
            <Container>
                <div style={{ position: 'relative' }}>
                    <h3
                        style={{
                            display: 'block',
                            position: 'absolute',
                            left: '-120px',
                            top: '36px',
                        }}
                    >
                        회의 정보 입력
                    </h3>
                    <AgendaForm
                        onSubmit={(e) => {
                            e.preventDefault()
                            alert('submit')
                            // api start
                        }}
                    >
                        {Object.entries(form)
                            .sort((a, b) => +a[0] - +b[0])
                            .map(([k, form]) => (
                                <React.Fragment key={form.id}>
                                    <AgendaInput
                                        init={k == '1' ? true : false}
                                        placeholder={`agenda ${form.order}`}
                                        form={form}
                                        onChange={onChange(form.order)}
                                        onDelete={onDelete(form.order)}
                                    />
                                </React.Fragment>
                            ))}
                        <StyledButton
                            type="button"
                            style={{ width: '120px' }}
                            onClick={addAgendaInput}
                        >
                            +Agenda
                        </StyledButton>
                        <div>
                            <h3>전체 목표 시간</h3>
                            <p>
                                <span>30분</span> (원더풀 , 인정해주는 문구? ,
                                퍼펙트해, 달려보자 - 15분 / 30분 / 50분 이하
                                해당시간에 대해서 문구 )
                            </p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <StyledButton
                                style={{ flex: 1 }}
                                type="button"
                                onClick={(e) => {
                                    // api pause
                                }}
                            >
                                나중에 할래요
                            </StyledButton>
                            <StyledButton style={{ flex: 2 }} type="submit">
                                지금 바로 시작해요
                            </StyledButton>
                        </div>
                    </AgendaForm>
                </div>
            </Container>
        </>
    )
}

function AgendaInput({
    placeholder,
    init = false,
    form,
    onChange,
    onDelete,
}: {
    placeholder: string
    form: Form
    init?: boolean
    onChange: any
    onDelete
}) {
    return (
        <AgendaInputContainer>
            <StyledInput
                type="text"
                name="agenda"
                value={form.agenda}
                placeholder={placeholder}
                onChange={onChange}
            />
            <div style={{ position: 'relative' }}>
                <StyledInput
                    type="number"
                    name="duration"
                    value={form.duration}
                    onChange={onChange}
                />
                <span
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '5px',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    분
                </span>
                {!init && (
                    <button
                        onClick={onDelete}
                        type="button"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '-115px',
                            transform: 'translate(-50%, -50%)',
                            border: '1px solid tomato',
                            padding: '1px 20px',
                        }}
                    >
                        삭제
                    </button>
                )}
            </div>
        </AgendaInputContainer>
    )
}

export default Setting
