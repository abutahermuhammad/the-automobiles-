import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Stack, Table } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Layout from '../../views/shared/layout/Layout';
import useAuth from '../../hooks/useAuth';

const TrackOrderDetails = () => {
    const [loading, setLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState({});
    let navigate = useNavigate();
    const {id, email} = useParams();

    useEffect(()=> {
        let url = `${process.env.REACT_APP_API_URI}/track/${id}/${email}`;

        fetch(url)
        .then(res=> res.json())
        .then(data=> {
            if (data) setOrderDetails(data);
            console.log('data', data)
            setLoading(false);
        });
        console.log(id, email);
        console.log(Object.keys(orderDetails).length);
        
        // console.log('products: ', products);
    }, []);


    return (
        <>
            {/* Loading State */}
            {loading && (
                <Layout className="am_page_track-order" >
                    <section className='am_track-order'>
                        <Container className='ps-5 py-5'>
                            <h1>Loading...</h1>
                        </Container>
                    </section>
                </Layout>
            )}

            {/* When Know Data Found */}
            { !loading && (Object.keys(orderDetails).length <= 0) && (
                <Layout className="am_page_track-order" >
                    <section className='am_track-order'>
                        <Container className='ps-5 py-5'>
                            <h1>No Order Found</h1>
                        </Container>
                    </section>
                </Layout>
            )}

            {/* When Data Found */}
            { !loading && (Object.keys(orderDetails).length > 0) && (
                <Layout className="am_page_track-order" >
                    <section className='am_track-order'>
                        <Container className='ps-5 py-5'>
                            <h1 className='mt-sm-0 mt-md-5 text-break'>Order ID: <span className='mark'>{(orderDetails?._id).toUpperCase()}</span></h1>
                            <p className='fs-3'>Date: <span className='mark'>{orderDetails?.date}</span></p>
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
                                                        {orderDetails?.cart && orderDetails?.cart.map(item=> (
                                                            <tr key={item?._id}>
                                                                <td>{item?.title} X <span className='fw-bold'>{item?.quantity}</span></td>
                                                                <td>${(item?.price).toFixed(2)}</td>
                                                                <td className='text-end'>${(item?.price * item?.quantity).toFixed(2)}</td>
                                                            </tr>
                                                        ))}
                                                        
                                                        {/* <tr>
                                                            <th colSpan={2} className="text-end">Sub-total</th>
                                                            <th className="fw-bold text-end">${252*5}</th>
                                                        </tr> */}

                                                        {/* <tr>
                                                            <th colSpan={2} className="text-end">Vat</th>
                                                            <th className="fw-bold text-end">${0}</th>
                                                        </tr> */}
                                                        
                                                        <tr>
                                                            <th colSpan={2} className="text-end">Total</th>
                                                            <th className="fw-bold text-end">${orderDetails?.orderPrice}</th>
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
                                                            <td className="pt-1 border-bottom-0 am_value">: {orderDetails?.name}</td>
                                                        </tr>    
                                                        
                                                        <tr>
                                                            <td className="fw-bold pt-1 border-bottom-0 am_key">Phone</td>
                                                            <td className="pt-1 border-bottom-0 am_value">: <a href={`tel:${orderDetails?.phone}`}>{orderDetails?.phone}</a></td>
                                                        </tr>     
                                                        
                                                        <tr>
                                                            <td className="fw-bold pt-1 border-bottom-0 am_key">Email</td>
                                                            <td className="pt-1 border-bottom-0 am_value">
                                                                <a href={`mailto:${orderDetails?.email}`}>: {orderDetails?.email}</a>
                                                            </td>
                                                        </tr>    
                                                        
                                                        <tr>
                                                            <td className="fw-bold pt-1 border-bottom-0 am_key">Address</td>
                                                            <td className="pt-1 border-bottom-0 am_value">: {orderDetails?.address}</td>
                                                        </tr>   
                                                        
                                                        <tr>
                                                            <td className="fw-bold pt-1 border-bottom-0 am_key">Address 1</td>
                                                            <td className="pt-1 border-bottom-0 am_value">: {orderDetails?.address1}</td>
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
            )}
        </>
    );
};

export default TrackOrderDetails;