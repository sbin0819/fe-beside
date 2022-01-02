import React from 'react'
import { useSelector, useDispatch } from '@store/hook'
import { setUserName, setInit } from '@store/user/userSlice'
import styled from 'styled-components'

const Container = styled.div`
    display: inline-block;
    margin: 20px 10px;
    padding: 20px 30px;
    border: 1px solid black;
    button {
        margin: 8px 6px;
        background: #bdbdbd;
        border: 1px solid black;
        padding: 5px 8px;
        cursor: pointer;
    }
`

function Profile() {
    const dispatch = useDispatch()
    const user = useSelector((store) => store.user)
    return (
        <Container>
            <h1>이름: {user.name}</h1>
            <h2>이메일: {user.email}</h2>
            <h2>나이: {user.age}</h2>
            <button
                onClick={() =>
                    dispatch(
                        setUserName({
                            name: 'user',
                            age: 30,
                            email: 'user@gmail.com',
                        })
                    )
                }
            >
                change btn
            </button>
            <button onClick={() => dispatch(setInit())}>origin btn</button>
        </Container>
    )
}

export default Profile
