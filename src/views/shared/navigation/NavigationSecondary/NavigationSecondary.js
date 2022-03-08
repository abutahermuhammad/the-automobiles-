import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

const NavigationSecondary = () => {
    return (
        <>
            <Navbar bg="primary"  className="am_navigation_secondary d-none d-sm-none d-md-block shadow" variant="dark">
                <Container>
                    <p className="mb-0 fs-sm">
                        +880 123-456789
                    </p>
                    <p className="mb-0 ms-3 me-auto fs-sm">
                        example@mail.com
                    </p>
                </Container>
            </Navbar>
        </>
    );
}

export default NavigationSecondary;