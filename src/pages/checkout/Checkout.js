import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import { Col, Container, Row, Button, Stack, Alert, Card, Table } from 'react-bootstrap'
import useAuth from '../../hooks/useAuth';
import useOrder from '../../hooks/useOrder'
import Layout from '../../components/shared/layout/Layout';
import useCart from '../../hooks/useCart';


const Checkout = () => {
    let navigate = useNavigate() 
    const params = useParams()
    let location = useLocation()
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const from = location?.state?.from?.pathname || '/'  // Previous visited path.
    const [loading, setLoading] = useState(true)
    const { order } = useOrder()
    const {
        user,
        loggedin,
    } = useAuth()
    const {cart, total} = useCart();

    useEffect(() => {
    //     if (user.email && loggedin === true) {
    //         navigate(from)
    //     } else {
            setLoading(false)
    //     }
    })

    const checkoutFormHandler = (values) => {
        const url = `${process.env.REACT_APP_API_URI}/order`;
        const data = {
            date: new Date(),
            ...values
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('_token')}`,
            },
            body: JSON.stringify(data)
        })
        .then(res=> res.json())
        .then(data=> {
            setError(false);
            if(data?.acknowledged === true) setSuccess(true);
            if(!data.status) setError(true);
        })
        .catch(()=> {
            setSuccess(false);
            setError(true);
        });
    }


    return (
        <>
            {loading && (<Layout><Container className="py-5"><p>Loading...</p></Container></Layout>)}
            {!loading && (
                <Layout className="checkout pt-5 pb-5">
                    <section className='fg-checkout'>
                        <Container>
                            <h1 className='mb-4'>Checkout</h1>
                            <Row className="justify-content-between">
                                <Col lg={6} md={6} sm={12}>
                                    {/* Success Alert */}
                                    <Alert className="mb-4" show={success} variant="success">
                                        Order successful
                                    </Alert>
                                    
                                    {/* Error Alert */}
                                    <Alert className="mb-4" show={error} variant="danger">
                                        Something wrong!
                                    </Alert>

                                    <Formik
                                        initialValues={
                                            { 
                                                name: user?.displayName, 
                                                email: user?.email, 
                                                phone: '', 
                                                address: '', 
                                                address1: '',
                                                orderId: order?.title,
                                                orderPrice: total,
                                            }
                                        }
                                        validate={values => {
                                            const errors = {};
                                            if (!values.name) {
                                                errors.name = 'Required';
                                            }
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
                                                checkoutFormHandler(values)
                                                setSubmitting(false);
                                            }, 400);
                                        }}
                                    >
                                        {({ values, errors, isSubmitting }) => (
                                            <Form className='gh-subscription-form'>
                                                <Stack direction="vertical">
                                                    {errors.email && (
                                                        <div className="--box p-3 bg-bg mb-4">
                                                        </div>
                                                    )}
                                                    <stack>
                                                        <Field className="mb-3 w-100" type="text" name="name" placeholder="Full Name" />
                                                        {errors.name && <p className="text-red">{errors.name}</p>}
                                                    </stack>
                                                    
                                                    <stack>
                                                        <Field className="mb-3 w-100" type="email" name="email" placeholder="Email" value={user?.email} />
                                                        {errors.email && <p className="text-red">{errors.email}</p>}
                                                    </stack>
                                                    
                                                    <stack>
                                                        <Field className="mb-3 w-100" type="tel" name="address" placeholder="Address line 1" />
                                                        {errors.password && <p className="text-red">{errors.password}</p>}
                                                    </stack>
                                                    <stack>
                                                        <Field className="mb-3 w-100" type="tel" name="address1" placeholder="Address line 2" />
                                                    </stack>

                                                    <stack>
                                                        <Field className="mb-3 w-100" type="text" name="phone" placeholder="Mobile" />
                                                        {errors.password1 && <p className="text-red">{errors.password1}</p>}
                                                    </stack>
                                                    <stack>
                                                        <Field className="mb-3 w-100" type="hidden" name="productPrice" value={parseFloat(total).toFixed(2)} />
                                                    </stack>
                                                    <Button type="submit" disabled={isSubmitting} variant="primary" >Checkout</Button>
                                                </Stack>
                                            </Form>
                                        )}
                                    </Formik>
                                </Col>

                                <Col lg={5} md={5} sm={12}>
                                    <Card className='shadow'>
                                        <Card.Header>
                                            <Card.Title className='mt-2'>Cart</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Table>
                                                <tbody>
                                                    {cart.map(item=> (
                                                        <tr>
                                                            <td>{item.title}</td>
                                                            <td className='text-primary'>{item.price}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                            
                                        </Card.Body>
                                        <Card.Footer>
                                            <p className='mb-0 fw-bold'>Total: <span className='text-primary'>${total}</span></p>
                                        </Card.Footer>
                                        
                                    </Card>
                                    
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </Layout>
            )}
        </>
    )
}

export default Checkout
