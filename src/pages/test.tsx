import { meetsSWR } from '@api/meet'
import { useRouter } from 'next/router'

function test() {
    const router = useRouter()
    const { data } = meetsSWR()
    return (
        <div style={{ display: 'flex' }}>
            {data?.map((el) => (
                <div
                    style={{ border: '1px solid black', padding: '20px 30px' }}
                    key={el.meet_id}
                    onClick={() => {
                        router.push(`/meeting/${el.meet_id}`)
                    }}
                >
                    {el.meet_title}
                </div>
            ))}
        </div>
    )
}

export default test
