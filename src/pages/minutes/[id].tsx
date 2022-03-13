import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Minutes from '@components/Minutes/index'
function Minute() {
    const router = useRouter()
    const { id } = router.query
    return <Minutes />
}

export default Minute
