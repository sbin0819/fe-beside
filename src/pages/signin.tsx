import { getProviders, signIn } from 'next-auth/react'

export default function SignIn({ providers }: { providers: any }) {
    return (
        <>
            {Object.values(providers).map((provider: any) => (
                <div key={provider.name}>
                    <button
                        onClick={() =>
                            signIn(provider.id, {
                                callbackUrl: '/login/join',
                            })
                        }
                    >
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </>
    )
}
export async function getServerSideProps() {
    return { props: { providers: await getProviders() } }
}
