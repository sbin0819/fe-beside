import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Login from '@components/Login/index'
import { Cookies } from 'react-cookie'
const cookies = new Cookies()
function LogingPage() {
    const router = useRouter()
    // 이런 느낌으로 login, join 페이지에 넣어 주면 좋을 거 같네요
    useEffect(() => {
        if (cookies.get('Authorization')) {
            router.back()
        }
    }, [])
    return <Login />
}

export default LogingPage
