import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Header } from '@common'
import styled from 'styled-components'
import { nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

import { Forms, Form } from 'types/setting'

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

// array to obj
function Setting({ init }: { init: boolean }) {
    // id 세팅 페이지 // order 추가
    const router = useRouter()
    const { id } = router.query
    const formOrderRef = useRef(1)
    const [forms, setForms] = useState<Forms>(
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
        setForms((prev) => ({
            ...prev,
            [order]: {
                ...prev[order],
                [name]: type === 'text' ? value : value === '' ? '' : +value,
                updated_at: new Date(),
            },
        }))
    }
    const onDelete = (order) => () => {
        const newForm = Object.entries(forms).reduce((acc, curr) => {
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
        formOrderRef.current = Object.keys(forms).length - 1
        setForms(newForm)
    }

    const addAgendaInput = () => {
        // next order
        formOrderRef.current = Object.keys(forms).length + 1
        setForms((prev) => ({
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
            const fetch = async () => {
                const response = await axios.get(`/api/setting/${id}`)
                setForms(response.data)
            }
            const fetch2 = async () => {
                const response = await axios.get(
                    'http://localhost:8000/api/agenda/'
                )
                console.log(response)
            }
            fetch()
            fetch2()
        }
    }, [router.isReady])
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
                            alert(JSON.stringify(forms))
                            // api start
                        }}
                    >
                        {Object.entries(forms)
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
                    placeholder="0"
                    value={parseInt(
                        form.duration.toString().replace(/(^0+)/, '')
                    )}
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
