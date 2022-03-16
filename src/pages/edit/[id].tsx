import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Edits from '@components/Edits/index'
function Edit() {
    const router = useRouter()
    const { id } = router.query
    return <Edits />
}

export default Edit
