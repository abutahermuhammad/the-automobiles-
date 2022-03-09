import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Layout from '../../views/shared/layout/Layout';
import useAuth from '../../hooks/useAuth';

const TrackOrder = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { user, loggedin } = useAuth();

    const trackOrderHandler = (values) => {
        console.log(values);
        navigate(`/track-order-details/${values?.orderID}/${values?.email}`);

    }


    return (
        <>
            <Layout className="am_page_track-order" >
                <section className='am_track-order'>
                    <Container className='py-5'>
                        <h1 className='ms-5'>Track your order</h1>
                    </Container>
                    <Container>
                        <Row g={4} className="justify-content-between">
                            {/* Login Form Area */}
                            <Col lg={6} md={6} sm={12} xs={12} className="mb-5">
                                <div className='am_register-left'>
                                    <Formik
                                    initialValues={{orderID: "", email: user?.email}}
                                    validate={values => {
                                        const errors = {};

                                        // Name Validator (Basic).
                                        if (!values.orderID) {
                                        errors.orderID = 'Required';
                                        }

                                        // Email Validator (Basic).
                                        if (!values.email) {
                                        errors.email = 'Required';
                                        } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                        ) {
                                        errors.email = 'Invalid email address';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            trackOrderHandler(values)
                                            setSubmitting(false);
                                        }, 400);
                                    }}
                                    >
                                        {({
                                            values,
                                            errors,
                                            touched,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            isSubmitting,
                                            /* and other goodies */
                                        }) => (
                                            <Form>
                                                <div className='mb-4'>
                                                    <h3 className='mb-2'>Order Information</h3>
                                                </div>

                                                <div className='mb-3'>
                                                    <Field 
                                                        className="w-100 " 
                                                        type="text" 
                                                        name="orderID"
                                                        placeholder="Order ID"
                                                    />
                                                    {errors.orderID && touched.orderID && (<p className='form-text text-danger mt-1'>{errors.orderID}</p>)}
                                                </div>

                                                <div className='mb-3'>
                                                    <Field 
                                                        className="w-100" 
                                                        type="email" 
                                                        name="email" 
                                                        placeholder="Email"
                                                    />
                                                    {errors.email && touched.email && (<p className='text-danger mt-1'>{errors.email}</p>)}
                                                </div>
                                                
                                                <div className=''>
                                                    <Button disable={isSubmitting} className="btn fw-bold w-100" variant='primary' type="submit">FIND ORDER</Button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </Col>

                            {/* Login Information Area */}
                            <Col lg={6} md={6} sm={12} xs={12} className="mb-5">
                                <div className='am_register-right'>
                                    <Card>
                                        <Card.Body>
                                            <h3 className='mb-2'>About tracking</h3>
                                            <Card.Text className='mb-3'>You can track your previous or ongoing order status by providing use your order ID & user email.</Card.Text>
                                            <Card.Text className='mb-4'><strong>NOTE: </strong>We will look into our personal data in our database to find your order info. By clicking "Find Order" button you are agreeing with use.</Card.Text>
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

export default TrackOrder;