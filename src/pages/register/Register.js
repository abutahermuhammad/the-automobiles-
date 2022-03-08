import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Layout from '../../views/shared/layout/Layout';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    let navigate = useNavigate();
    let location = useLocation();
    const from = location?.state?.from?.pathname || '/'  // Previous visited path.
    const [loading, setLoading] = useState(true);
    const {
        auth,
        user,
        loggedin,
        message,
        signupWithFormHandler,
        signinWith0Handler
    } = useAuth();

    useEffect(() => {
        if (user.email && loggedin === true) {
            navigate(from);
        } else {
            setLoading(false);
        }
    });


    return (
        <>
            {loading && (<Layout><Container className="py-5"><p>Loading...</p></Container></Layout>)}
            {!loading && (
                <Layout className="as_page_register" >
                    <section className='as_register'>
                        <Container>
                            <h1 className='mb-4'>Create an Account</h1>
                        </Container>
                        <Container>
                            <Row g={4} className="justify-content-between">
                                {/* Login Form Area */}
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <div className='ps_register_left mb-5'>
                                        <Formik
                                        initialValues={{displayName: "", email: "", password: ""}}
                                        validate={values => {
                                            const errors = {};

                                            // Name Validator (Basic).
                                            if (!values.displayName) {
                                            errors.displayName = 'Required';
                                            }

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
                                                signupWithFormHandler(values)
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
                                                        <h3 className='mb-2'>Account Information</h3>
                                                    </div>

                                                    <div className='mb-3'>
                                                        <Field 
                                                            className="w-100 " 
                                                            type="text" 
                                                            name="displayName" 
                                                            placeholder="Full name"
                                                        />
                                                        {errors.email && touched.email && (<p className='form-text text-danger mt-1'>{errors.displayName}</p>)}
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
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <div className='ps_register_right'>
                                        <Card>
                                            <Card.Body>
                                                <h3 className='mb-2'>Old Customers</h3>
                                                <Card.Text className='mb-4'>By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.</Card.Text>

                                                <Button href={`/login`}>LOG IN</Button>
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

export default Register;