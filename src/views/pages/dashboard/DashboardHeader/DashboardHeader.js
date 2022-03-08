import { Container } from 'react-bootstrap';


const DashboardHeader = () => {
    return (
        <>
            <div className="--dashboard-viewport py-2 bg-primary border-bottom">
                <Container className="py-4">
                    <h2 className="fs-2">Dashboard</h2>
                </Container>
            </div>
        </>
    );
}

export default DashboardHeader;