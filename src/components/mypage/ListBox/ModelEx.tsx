import React from 'react'

function ModelEx() {
    return (
        <>
            <div
                style={{
                    width: '528px',
                    height: '696px',
                    borderRadius: '24px',
                    border: '1px solid blue',
                    padding: '32px 36px',
                }}
            >
                <div>
                    <h2
                        style={{
                            fontSize: '32px',
                            marginBottom: '5px',
                            fontWeight: '500',
                        }}
                    >
                        내 계정
                    </h2>
                    <p
                        style={{
                            color: '#87878b',
                            fontSize: '14px',
                            marginBottom: '36px',
                        }}
                    >
                        계정 설정 변경 사항은 모든 워크페이스에 적용됩니다.
                    </p>
                </div>
                <div style={{ marginTop: '32px' }}>
                    <h3 style={{ fontWeight: 'bold' }}>닉네임</h3>
                    <input
                        placeholder="10자 이내 입력"
                        style={{
                            marginTop: '5px',
                            width: '360px',
                            height: '48px',
                            borderRadius: '12px',
                            border: '1px solid #d6d6d7',
                            marginBottom: '31px',
                        }}
                    />
                </div>
                <hr style={{ border: '1px solid #f1f1f1' }} />
                <div style={{ marginTop: '32px' }}>
                    <h3
                        style={{
                            fontWeight: 'bold',
                            fontSize: '14px',
                            marginBottom: '8px',
                        }}
                    >
                        계정
                    </h3>
                    <p style={{ fontSize: '16px' }}>testeamil@gmail.com</p>
                </div>
                <div style={{ marginTop: '32px' }}>
                    <h3
                        style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            marginBottom: '8px',
                        }}
                    >
                        계정 탈퇴
                    </h3>
                    <button
                        style={{
                            width: '130px',
                            height: '40px',
                            padding: '10px 20px',
                            border: '1px solid #e24646',
                            color: '#e24646',
                            borderRadius: '12px',
                            fontSize: '14px',
                        }}
                    >
                        회원 탈퇴하기
                    </button>
                </div>
                <div>
                    <button
                        style={{
                            width: '72px',
                            height: '40px',
                            border: '1px solid #d6d6d7',
                            color: '#87878b',
                            padding: '10px 20px',
                            borderRadius: '12px',
                            fontSize: '14px',
                            marginRight: '12px',
                        }}
                    >
                        취소
                    </button>
                    <button
                        style={{
                            width: '72px',
                            height: '40px',
                            backgroundColor: '#162f55',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '12px',
                            fontSize: '14px',
                            marginRight: '12px',
                        }}
                    >
                        저장
                    </button>
                </div>
            </div>
        </>
        /////

        // <div
        //         style={{
        //             width: '556px',
        //             height: '643px',
        //             borderRadius: '24px',
        //             border: '1px solid blue',
        //             padding: '32px 36px 2px',
        //         }}
        //     >
        //         <div style={{ marginBottom: '36px' }}>
        //             <h2
        //                 style={{
        //                     fontSize: '32px',
        //                     fontWeight: '500',
        //                     marginBottom: '5px',
        //                 }}
        //             >
        //                 탈퇴하기
        //             </h2>
        //             <p
        //                 style={{
        //                     color: '#87878b',
        //                     lineHeight: '1.43',
        //                     fontSize: '14px',
        //                 }}
        //             >
        //                 너무 아쉽네요... 😭 <br />
        //                 탈퇴하시기 전에 59mins를 떠나시는 이유를 알려주시면,{' '}
        //                 <br />
        //                 모든 직장인들의 효율적인 회의를 위해 서비스 개선에
        //                 적극젇으로 반영하도록 하겠습니다.
        //             </p>
        //         </div>
        //         <div style={{ marginBottom: '38px' }}>
        //             <h3
        //                 style={{
        //                     fontSize: '14px',
        //                     fontWeight: 'bold',
        //                     marginBottom: '8px',
        //                 }}
        //             >
        //                 탈퇴이유
        //             </h3>
        //             <ul style={{ fontSize: '14px', color: '#89898b' }}>
        //                 <li>
        //                     <input type="radio" />
        //                     <label>자주 이용하지 않음</label>
        //                 </li>
        //                 <li>
        //                     <input type="radio" />
        //                     <label>개인정보 노출 걱정</label>
        //                 </li>
        //                 <li>
        //                     <input type="radio" />
        //                     <label>UI/UX 불편</label>
        //                 </li>
        //                 <li>
        //                     <input type="radio" />
        //                     <label>제공하는 기능 및 서비스 부족</label>
        //                 </li>
        //                 <li>
        //                     <input type="radio" />
        //                     <label>고객센터 응대 불만</label>
        //                 </li>
        //                 <li>
        //                     <input type="radio" />
        //                     <label>사이트 시스템의 에러 불만</label>
        //                 </li>
        //                 <li>
        //                     <input type="radio" />
        //                     <label>기타</label>
        //                 </li>
        //             </ul>
        //         </div>
        //         <div>
        //             <h3
        //                 style={{
        //                     fontSize: '14px',
        //                     fontWeight: 'bold',
        //                     marginBottom: '26px',
        //                 }}
        //             >
        //                 탈퇴하시기 전에 꼭 확인해주세요!
        //             </h3>
        //             <ul
        //                 style={{
        //                     fontSize: '14px',
        //                     color: '#87878b',
        //                     lineHeight: '1.43',
        //                 }}
        //             >
        //                 <li>
        //                     1. 탈퇴시 작성했던 회의록은 즉시 삭제되어 복구할 수
        //                     없습니다. <br />
        //                     <span>
        //                         *재가입 하실 경우에도 복원되지 않으니 신중하게
        //                         생각해주세요.
        //                     </span>
        //                 </li>
        //                 <li>
        //                     2. 탈퇴 시 해당 계정이 삭제되어 해당 계정으로 7일간
        //                     재가입이 불가능합니다.
        //                 </li>
        //                 <li>
        //                     3. 가입된 계정 정보는 별도의 DB로 옮겨져 내부 방침
        //                     및 기타 법령에 의한 <br />
        //                     보유 사유에 따라 90일간 보존 후 삭제처리 됩니다.
        //                 </li>
        //             </ul>
        //         </div>
        //         <div>
        //             <button
        //                 style={{
        //                     width: '72px',
        //                     height: '40px',
        //                     border: '1px solid #d6d6d7',
        //                     color: '#87878b',
        //                     padding: '10px 20px',
        //                     borderRadius: '12px',
        //                     fontSize: '14px',
        //                     marginRight: '12px',
        //                 }}
        //             >
        //                 취소
        //             </button>
        //             <button
        //                 style={{
        //                     width: '72px',
        //                     height: '40px',
        //                     backgroundColor: '#e24646',
        //                     color: '#fff',
        //                     padding: '10px 20px',
        //                     borderRadius: '12px',
        //                     fontSize: '14px',
        //                     marginRight: '12px',
        //                 }}
        //             >
        //                 저장
        //             </button>
        //         </div>
        //     </div>
    )
}

export default ModelEx
