import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Login from '@components/Login/index'
import { Cookies } from 'react-cookie'
const cookies = new Cookies()
function LogingPage() {
    const router = useRouter()
    useEffect(() => {
        if (cookies.get('Authorization')) {
            router.back()
        }
    }, [])
    return <Login />
}

export default LogingPage
