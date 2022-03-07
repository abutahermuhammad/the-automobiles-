import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Card, Table, Image, Stack, Offcanvas, Button, Alert } from 'react-bootstrap'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import useAuth from '../../hooks/useAuth'


const Reviews = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false) // Add new review button state.
    const { user, role, loggedin } = useAuth()
    const [testimonials, setTestimonials] = useState([])  // Testimonials List.
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    useEffect(() => { 
        if (!user.email || loggedin === false) {
            navigate('/login')
        }
    }, [])

    useEffect( () => {
        /**
         * Products Parser.
         */
        // fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/products`)
        const url = (role === 'admin') 
            ? `${process.env.REACT_APP_API_URI}/review`
            : `${process.env.REACT_APP_API_URI}/review?email=${user?.email}`

        fetch(url)
        .then(res=> res.json())
        .then(data=> {
            setLoading(false)
            setTestimonials(data.data)
        })
    }, [handleClose])

    /**
     * Adding new review to the database.
     */
    const addReview = (values) => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URI}/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('_token')}`
            },
            body: JSON.stringify(values)
        })
        .then(res=> res.json())
        .then(data => {
            if (data.status === 200) {
                setIsLoading(false);
                setShow(false);
                setSuccess(true);
            } else {
                setIsLoading(false);
                setShow(false);
                setError(true);
            }
        })
    }
        
    return (
        <>
            {(testimonials.length <= 0 && loading === true) && (
                <Card bg="black" text="primary">

                    <Card.Header>
                        <Stack direction="horizontal">
                            <Card.Title>Reviews</Card.Title>

                            <Button className="ms-auto" onClick={() => handleShow()} variant="outline-primary" size="sm" >Add new</Button>
                        </Stack>
                    </Card.Header>

                    <Card.Body className="bg-primary text-black">
                        <Card.Text>Loading...</Card.Text>
                    </Card.Body>

                </Card>
            )}
            
            {(testimonials.length <= 0 && loading === false) && (
                <Card bg="black" text="primary"> 
                    <Card.Header>
                        <Stack direction="horizontal">
                            <Card.Title>Reviews</Card.Title>

                            <Button className="ms-auto" onClick={() => handleShow()} variant="outline-primary" size="sm" >Add new</Button>
                        </Stack>
                    </Card.Header>
                    
                    <Card.Body className="bg-primary text-black">
                        <Card.Text>No review found</Card.Text>
                    </Card.Body>
                </Card>
            )}
            
            {(testimonials.length > 0 && loading === false) && (
                <>
                    <Card className="border-0 shadow">

                        <Card.Header className="bg-black text-primary">
                            <Stack direction="horizontal">
                                <Card.Title className="pt-2 fs-4">Reviews</Card.Title>

                                <Button className="ms-auto" onClick={() => handleShow()} variant="outline-primary" size="sm" >Add new</Button>
                            </Stack>
                        </Card.Header>

                        <Card.Body className="p-0">
                            
                            {/* Success Alert */}
                            <Alert className="mb-4" show={success} variant="success">
                                Successfully added
                            </Alert>
                            <Alert className="mb-4" show={error} variant="danger">
                                Something wrong!
                            </Alert>

                            <Table hover>
                                <thead className="border-bottom-1">
                                    <tr>
                                        <th className="ps-3">#</th>
                                        <th className="text-end pe-3">Statement</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {testimonials && testimonials.map((testimonial, i) => (
                                        <tr key={testimonial?._id}>
                                            <td className="ps-3">{++i}</td>
                                            <td className="text-end pe-3">{testimonial?.statement}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </>
            )}

            <Offcanvas show={show} placement="end" name="end" onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Add new review</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <Formik
                        initialValues={{ email: user?.email, statement: '' }}
                        validate={values => {
                            const errors = {}
                            if (!values.statement) {
                                errors.statement = 'Required'
                            }
                            return errors
                        } }
                        onSubmit={(values) => {
                            addReview(values)
                        } }
                    >
                        {({ values, errors, isSubmitting }) => (
                            <Form className='gh-subscription-form'>
                                <Stack direction="vertical">
                                    <stack>
                                        <Field className="mb-3 w-100" type="email" name="email" placeholder="Email" value={user?.email} />
                                    </stack>
                                    <stack>
                                        <Field className="mb-3 w-100" component="textarea" name="statement" placeholder="Write your review" />
                                        <ErrorMessage name="statement" className="text-red" component="p" />
                                    </stack>

                                    <Button type="submit" disabled={isLoading} variant="dark">
                                        {isLoading ? 'Loading…' : 'Save'}
                                    </Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Reviews
