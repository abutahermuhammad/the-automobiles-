import { Button, Container } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import Layout from "../../views/shared/layout/Layout"

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <>
            <Layout className="pt-5 pb-5">
                <section className="be-error-404">
                    <Container>
                        <h1 className="mb-2">Opps!</h1>
                        <h4 className="mb-2">404 Status</h4>
                        <p className="mb-5">Please make sure you're in the right address.</p>

                        <p>
                            <Button variant="primary" onClick={() => navigate('/')}>
                                Get back to homepage
                            </Button>
                        </p>
                    </Container>
                </section>
            </Layout>
        </>
    )
}

export default Error404
