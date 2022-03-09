import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Layout from '../../views/shared/layout/Layout';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    let navigate = useNavigate() 
    let location = useLocation()
    const from = location?.state?.from?.pathname || '/'  // Previous visited path.
    const [loading, setLoading] = useState(true) 
    const {
        user,
        loggedin,
        message,
        signinWithFormHandler,
        signinWith0Handler
    } = useAuth()
                                                                           

    useEffect(() => {
        if (user.email && loggedin === true) {
            navigate(from)
        } else { 
            setLoading(false)
        }
    })



    return (
        <>
            {loading && (<Layout><Container className="py-5"><p>Loading...</p></Container></Layout>)}
            {!loading && (
                <Layout className="am_page_login" >
                    <section className='am_login'>

                        {/* Page Header */}
                        <Container className='my-5'>
                            <h1 className='ms-5 mb-4'>Login or Create an Account</h1>
                        </Container>

                        {/* Page Body */}
                        <Container>
                            <Row gx={4}>
                                {/* Login Form Area */}
                                <Col lg={6} md={6} sm={12} xs={12} className="mb-5">
                                    <div className='am_login-left'>
                                        <Formik
                                            initialValues={{email: "", password: ""}}
                                            validate={values => {
                                                const errors = {};

                                                // Email Validator (Basic).
                                                if (!values.email) {
                                                errors.email = 'Required';
                                                } else if (
                                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                                ) {
                                                errors.email = 'Invalid email address';
                                                }

                                                // Password Validator (Basic).
                                                if (values.password.length < 6) {
                                                    errors.password = "Password leangth at least 6 character.";
                                                } else if (! values.password) {
                                                    errors.password = "Required";
                                                }
                                                return errors;
                                            }}
                                            onSubmit={(values, { setSubmitting }) => {
                                                setTimeout(() => {
                                                    signinWithFormHandler(values)
                                                    setSubmitting(false);
                                                }, 400);
                                            }}
                                        >
                                            {({
                                                values,
                                                errors,
                                                touched,
                                                isSubmitting,
                                                /* and other goodies */
                                            }) => (
                                                <Form>
                                                    <div className='mb-4'>
                                                        <h3 className='mb-2'>Registered Customers</h3>
                                                        <p className='mb-4'>If you have an account with us, please log in.</p>
                                                    </div>
                                                    {message && (
                                                        <div className="border border-warning rounded text-danger p-3 bg-bg mb-4">
                                                            {message}
                                                        </div>
                                                    )}

                                                    <div className='mb-3'>
                                                        <Field 
                                                            className="w-100" 
                                                            type="email" 
                                                            name="email" 
                                                            placeholder="Email" 
                                                        />
                                                        {errors.email && touched.email && (<p className='text-danger mt-1'>{errors.email}</p>)}
                                                    </div>
                                                    
                                                    <div className='mb-3'>
                                                        <Field className="w-100" type="password" name="password" placeholder="Password" />
                                                        {errors.password && touched.password && (<p className='text-danger mt-1'>{errors.password}</p>)}
                                                    </div>
                                                    
                                                    <div className=''>
                                                        <Button disable={isSubmitting} className="btn w-100" variant='primary' type="submit"> Submit </Button>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                        
                                        <Stack className="mt-4">
                                            <Button className="mb-3" onClick={() => signinWith0Handler('google')} variant="outline-dark" as="div" disabled={false} >Sign in with Google</Button>
                                        </Stack>

                                    </div>
                                </Col>

                                {/* Login Information Area */}
                                <Col lg={6} md={6} sm={12} xs={12} className="mb-5">
                                    <div className='am_login-right'>
                                        <Card>
                                            <Card.Body>
                                                <h3 className='mb-2'>New Customers</h3>
                                                <Card.Text className='mb-4'>By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.</Card.Text>

                                                <Link className="btn btn-primary" to={`/register`}>CREATE AN ACCOUNT</Link>
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

export default Login;