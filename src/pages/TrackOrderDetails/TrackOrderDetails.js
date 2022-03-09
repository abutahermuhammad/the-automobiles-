import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Stack, Table } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Layout from '../../views/shared/layout/Layout';
import useAuth from '../../hooks/useAuth';

const TrackOrderDetails = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { user, loggedin } = useAuth();
    const params = useParams();
    const {id, email} = useParams();
    console.log(params);

    const trackOrderHandler = (values) => {
        console.log(values);

    }


    return (
        <>
            <Layout className="am_page_track-order" >
                <section className='am_track-order'>
                    <Container className='ps-5 py-5'>
                        <h1 className=''>Order: <span className='mark'>{id.toUpperCase()}</span></h1>
                    </Container>
                    <Container>
                        <Row g={4} className="justify-content-between">
                            {/* Login Form Area */}
                            <Col lg={7} md={7} sm={12} xs={12} className="mb-5">
                                <div className='am_register-left'>
                                <Card>
                                        <Card.Body>
                                            <h3 className='mb-2'>About tracking</h3>
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <td>Title</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>

                            {/* Login Information Area */}
                            <Col lg={5} md={5} sm={12} xs={12} className="mb-5">
                                <div className='am_register-right'>
                                    <Card>
                                        <Card.Body>
                                            <h3 className='mb-3'>User info</h3>
                                            <Card.Text className='mb-1 d-flex justify-content-between'>
                                                <span className='am_key'>Name</span>
                                                <span className='am_value'>: Abu Taher Muhammad</span>
                                            </Card.Text>
                                            <Card.Text className='mb-1 d-flex justify-content-between'>
                                                <span className='am_key'>Email</span>
                                                <span className='am_value'>: Abu Taher Muhammad</span>
                                            </Card.Text>
                                            
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Layout>
        </>
    );
};

export default TrackOrderDetails;