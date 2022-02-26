import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function useIsHeader() {
    const router = useRouter()
    const { pathname } = router
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
    useEffect(() => {
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
    return { isHeader, desc: descList[descListKey] ?? '' }
}

export default useIsHeader
