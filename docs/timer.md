# Progress

## 작업

- 타이머가 정보를 내려주는 mock api
    
    local 실행시
    
    GET - http://localhost:3000/api/timer
    
    PUT - [http://localhost:3000/api/timer](http://localhost:3000/api/timer) body: {remainingTime: number}
    
    - 소스 코드
        
        ```tsx
        // src/pages/api/timer
        
        // 기본 타이머 정보 값
        interface Timer {
            id: string
            start: boolean
            duration: number
            remainingTime: number
            level: number
        }
        
        export default function handler(
            req: NextApiRequest,
            res: NextApiResponse<Timer>
        ) {
        		// 1초마다 타이머 정보값 수정 확인
            if (req.method === 'PUT') {
                const newData = {
                    ...data,
                    remainingTime: JSON.parse(req.body.remainingTime),
                }
                res.status(200).json(newData)
            } else {
                res.status(200).json(data)
            }
        }
        ```
        
    
- timer 계산 hooks
    
    ```tsx
    // ## 사용예시
    // ## 실제구현 src/hooks/useTimer 참고
    
    // 인자 duration: 지속 시간, onEnd: 타이머 종료 후 callback 함수
    /*
    	- minutes 남은 시간에서 분 부분
    	- seconds 남은 시간에서 초 부분
    	- remainingTime 남은 시간 밀리세컨드 단위
    	- start 타이머 시작 함수
    	- stop 타이머 스탑 함수
    	- reset 타이머 재시작 함수
    */
    
    {...}
    const { minutes, seconds, start, stop, reset, isRunning, remainingTime } =
            useTimer({
                duration: data?.data?.duration,
                onEnd: () => {},})
    
     
    const putRemainTime = async (time) => {
            await axios.put(
                'http://localhost:3000/api/timer',
                {
                    remainingTime: Math.floor(time),
                },
                { withCredentials: true }
            )
        }
    
    // * useEffect를 통해서 서버에 1초마다 바뀐 값을 던져줌
    useEffect(() => {
            let timer
            if (isRunning) {
                timer = setTimeout(() => putRemainTime(remainingTime / 100))
            }
            if (!isRunning) {
                clearTimeout(timer)
            }
            return () => clearTimeout(timer)
        }, [isRunning, seconds])
    ```