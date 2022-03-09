import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Stack, Table } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Layout from '../../views/shared/layout/Layout';
import useAuth from '../../hooks/useAuth';
import { Tab } from 'bootstrap';

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
                        <h1 className='mt-sm-0 mt-md-5'>Order ID: <span className='mark'>{id.toUpperCase()}</span></h1>
                        <p className='fs-3'>Date: <span className='mark'>{"2022-01-29T10:01:10.834Z".toUpperCase()}</span></p>
                    </Container>
                    <Container>
                        <Row g={4} className="justify-content-between">
                            {/* Login Form Area */}
                            <Col lg={7} md={7} sm={12} xs={12} className="mb-5">
                                <div className='am_tracking-details-left'>
                                <Card>
                                        <Card.Body>
                                            <h3 className='mb-2'>Order details</h3>
                                            <Table className='mb-0'>
                                                <tbody>
                                                    <tr>
                                                        <td className='fw-bold border-bottom-1'>Title</td>
                                                        <td className='fw-bold border-bottom-1'>Unit Price</td>
                                                        <td className='fw-bold border-bottom-1 text-end'>Total</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Kincrome Bluetooth OBD2 Vehicle Monitor X <span className='fw-bold'>{2}</span></td>
                                                        <td>$252</td>
                                                        <td className='text-end'>${252*2}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Kincrome Bluetooth OBD2 X <span className='fw-bold'>{2}</span></td>
                                                        <td>$252</td>
                                                        <td className='text-end'>${252*2}</td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <th colSpan={2} className="text-end">Sub-total</th>
                                                        <th className="fw-bold text-end">${252*5}</th>
                                                    </tr>

                                                    <tr>
                                                        <th colSpan={2} className="text-end">Vat</th>
                                                        <th className="fw-bold text-end">${0}</th>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <th colSpan={2} className="text-end">Total</th>
                                                        <th className="fw-bold text-end">${252*2}</th>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>

                            {/* Login Information Area */}
                            <Col lg={5} md={5} sm={12} xs={12} className="mb-5">
                                <div className='am_tracking-details-right'>
                                    <Card>
                                        <Card.Body>
                                            <h3 className='mb-3'>User info</h3>
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <td className="fw-bold pt-1 border-bottom-0 am_key">Name</td>
                                                        <td className="pt-1 border-bottom-0 am_value">: Abu Taher Muhammad</td>
                                                    </tr>    
                                                    
                                                    <tr>
                                                        <td className="fw-bold pt-1 border-bottom-0 am_key">Phone</td>
                                                        <td className="pt-1 border-bottom-0 am_value">: <a href='tel:+8801627085640'>+8801627085640</a></td>
                                                    </tr>     
                                                    
                                                    <tr>
                                                        <td className="fw-bold pt-1 border-bottom-0 am_key">Email</td>
                                                        <td className="pt-1 border-bottom-0 am_value">
                                                            <a href="mailto:abut1081@gmail.com">: abut1081@gmail.com</a>
                                                        </td>
                                                    </tr>    
                                                    
                                                    <tr>
                                                        <td className="fw-bold pt-1 border-bottom-0 am_key">Address</td>
                                                        <td className="pt-1 border-bottom-0 am_value">: House: 26. Block: D</td>
                                                    </tr>   
                                                    
                                                    <tr>
                                                        <td className="fw-bold pt-1 border-bottom-0 am_key">Address 1</td>
                                                        <td className="pt-1 border-bottom-0 am_value">: Village: Hazipur Sukna, Sylhet</td>
                                                    </tr> 
                                                </tbody>
                                            </Table>
                                            
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