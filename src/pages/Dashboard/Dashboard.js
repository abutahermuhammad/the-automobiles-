import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DashboardSideMenu from '../../components/dashboard/DashboardSideMenu';
import DashboardHeader from '../../components/dashboard/DashboardHeader/DashboardHeader';
import Layout from '../../components/shared/layout/Layout';
import useAuth from '../../hooks/useAuth';


const Dashboard = () => {
    let navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const { user, role, loggedin } = useAuth()

    useEffect(() => { 
        if (!user.email || loggedin === false) {
            navigate('/login')
        } else { 
            setIsLoading(false)
        }
    })
        
    return (
        <>
            {isLoading && (<Layout><Container className="py-5"><p>Loading...</p></Container></Layout>)}
            {!isLoading && (
                
                <Layout className='dashboard'>

                    <DashboardHeader />
                    
                    <div className="--dashboard-dashboard py-5 ">
                        <Container>
                            <Row>
                                <Col as="aside" lg={2} md={2} sm={12}>
                                    <DashboardSideMenu role={role} />
                                </Col>
                                <Col lg={10} md={10} sm={12}>

                                    {/* {user?.displayName && (
                                        <div className='p-4'>
                                            <h1>Hi {user?.displayName}</h1>
                                        </div>
                                    )} */}
                                    
                                    <Outlet />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Layout>
            )}
        </>
    )
}

export default Dashboard
