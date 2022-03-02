import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Cookies } from 'react-cookie'
const cookies = new Cookies()

function useIsHeader() {
    const router = useRouter()
    const { pathname } = router
    const withOutAuthUrlList = ['/login', '/join']
    const headerOmitList = [
        '/login',
        '/login/join',
        '/signup',
        '/randing',
        '/404',
    ]
    // 추후수정
    const descList = {
        '/': '님의 회의 리스트 목록입니다.',
        '/setting': '님의 회의 리스트 목록입니다.',
        '/meeting': '님! 목표시간내로 팀원들과 함께 회의를 끝내보아요!',
        '/home': '님의 회의 리스트 목록입니다. ',
    }
    const [isHeader, setIsHeader] = useState(false)
    const [descListKey, setDescListKey] = useState('')
    const [auth, setAuth] = useState('')
    useEffect(() => {
        if (cookies.get('Authorization') && auth === '') {
            setAuth(cookies.get('Authorization'))
        }
        setDescListKey(() => {
            const arr = pathname.split('/')
            if (arr.length > 2) {
                return `/${arr[1]}`
            } else {
                return pathname
            }
        })
        if (headerOmitList.includes(pathname)) {
            setIsHeader(false)
        } else {
            setIsHeader(true)
        }
    }, [pathname])

    return { isHeader, auth, desc: descList[descListKey] ?? '' }
}

export default useIsHeader
