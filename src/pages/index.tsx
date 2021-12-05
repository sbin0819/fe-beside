import Test from '@components/Test'
import styled from 'styled-components'

const Container = styled.div`
    background: gold;
`
const Home = () => {
    return (
        <Container>
            <Test />
        </Container>
    )
}

export default Home
