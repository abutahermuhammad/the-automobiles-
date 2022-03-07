import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Image, Stack, Button, Offcanvas } from 'react-bootstrap'
import useAuth from '../../hooks/useAuth'
import { ErrorMessage, Field, Form, Formik } from 'formik'


const Products = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])  // Product List.
    const { user, role, loggedin } = useAuth();
    const [isLoading, setIsLoading] = useState(false) // Add new review button state.
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => { 
        if (!user.email || loggedin === false) {
            navigate('/login')
        }
    })

    useEffect( () => {
        /**
         * Products Parser.
         */
        // fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/products`)
        fetch(`${process.env.REACT_APP_API_URI}/product`)
        .then(res=> res.json())
        .then(data=> {
            setProducts(data.data)
            setLoading(false)
        })
    })


    /**
     * Adding new review to the database.
     */
     const addProduct = (values) => { 
        let product = {
            timestamp: Date.now(),
            image: values.image,
            title: values.title,
            categorie: values.category,
            price: {
                reguler: values.regulerPrice,
                special: values.specialPrice
            }
        }
        console.log(product)

        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URI}/product`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('_token')}`
            },
            body: JSON.stringify(product)
        })
        .then(res=> res.json())
        .then(data => {
            setIsLoading(false)
            setShow(false)
            if (data.status === 200) {
                setSuccess(true)
            } else {
                setError(true)
            }
        })
    }
        
    return (
        <>
            {(products.length <= 0 && loading === true) && (
                <Card>
                    <Card.Header>
                        <Stack direction="horizontal">
                            <Card.Title>Products</Card.Title>

                            <Button className="ms-auto" onClick={() => handleShow()} variant="outline-dark" size="sm" >Add new</Button>
                        </Stack>
                    </Card.Header>
                    <Card.Body><Card.Text>Loading...</Card.Text></Card.Body>
                </Card>
            )}

            {(products.length <= 0 && loading === false) && (
                <Card>
                    <Card.Header>
                        <Stack direction="horizontal">
                            <Card.Title>Products</Card.Title>

                            <Button className="ms-auto" onClick={() => handleShow()} variant="outline-dark" size="sm" >Add new</Button>
                        </Stack>
                    </Card.Header>
                    <Card.Body><Card.Text>No product found!</Card.Text></Card.Body>
                </Card>
            )}

            {(products.length > 0 && loading === false) && (
                <Card>
                    <Card.Header>
                        <Stack direction="horizontal">
                            <Card.Title>Products</Card.Title>

                            <Button className="ms-auto" onClick={() => handleShow()} variant="outline-dark" size="sm" >Add new</Button>
                        </Stack>
                    </Card.Header>
                    <Card.Body>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map((product, i) => (
                                    <tr key={product?._id}>
                                        <td>{++i}</td>
                                        <td>
                                            {`${new Date(product?.timestamp).getDate()}/${new Date(product?.timestamp).getMonth()}/${new Date(product?.timestamp).getFullYear()}`}
                                        </td>
                                        <td>
                                            <Image src={product?.image} width={36} alt={product?.title} />
                                        </td>
                                        <td>
                                            {product?.title}
                                        </td>
                                        <td>
                                            {`Reguler: ${product?.price.reguler}`}<br/>
                                            {product?.price.special && (
                                                `Special: $${product?.price.special}`
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                    
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )}

            <Offcanvas show={show} placement="end" name="end" className="w-50" onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Add new product</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <Formik
                        initialValues={{ 
                            email: user?.email, 
                            title: '',
                            statement: '' 
                        }}
                        validate={values => {
                            const errors = {}
                            if (!values.title) {
                                errors.title = 'Required'
                            }

                            if (!values.image) {
                                errors.image = 'Required'
                            }

                            if (!values.category) {
                                errors.category = 'Required'
                            }
                            if (!values.regulerPrice) {
                                errors.regulerPrice = 'Required'
                            }

                            // Product description.
                            if (!values.description) {
                                errors.description = 'Required'
                            }
                            return errors
                        } }
                        onSubmit={(values) => {
                            addProduct(values)
                        } }
                    >
                        {({ values, errors, isSubmitting }) => (
                            <Form className='gh-subscription-form'>
                                <Stack direction="vertical">
                                    <Stack>
                                        <Field className="w-100" type="hidden" name="email" placeholder="Email" value={user?.email} />
                                    </Stack>
                                    
                                    {values?.image && (
                                        <img src={values.image} alt=""/>
                                    )}

                                    {/* Product Image */}
                                    <Stack>
                                        <Field className="w-100" type="url" name="image" placeholder="Image URL" />
                                        <ErrorMessage name="image" className="text-danger mt-1 mb-0" component="p" />
                                    </Stack>

                                    {/* Product Title */}
                                    <Stack>
                                        <Field className="mt-3 w-100" type="text" name="title" placeholder="Product title" />
                                        <ErrorMessage name="title" className="text-danger mt-1 mb-0" component="p" />
                                    </Stack>

                                    {/* Product Category */}
                                    <Stack>
                                        <Field className="mt-3 w-100" type="text" name="category" placeholder="Product category" />
                                        <ErrorMessage name="category" className="text-danger mt-1 mb-0" component="p" />
                                    </Stack>

                                    {/* Reguler Price */}
                                    <Stack>
                                        <Field className="mt-3 w-100" type="number" name="regulerPrice" placeholder="Reguler price" />
                                        <ErrorMessage name="regulerPrice" className="text-danger mt-1 mb-0" component="p" />
                                    </Stack>
                                    
                                    {/* Special Price */}
                                    <Stack>
                                        <Field className="mt-3 w-100" type="number" name="specialPrice" placeholder="Special price" />
                                        <ErrorMessage name="specialPrice" className="text-danger mt-1 mb-0" component="p" />
                                    </Stack>

                                    {/* Product Description */}
                                    <Stack>
                                        <Field className="mt-3 w-100" component="textarea" name="description" placeholder="Product description" />
                                        <ErrorMessage name="description" className="text-danger mt-1 mb-0" component="p" />
                                    </Stack>

                                    <Stack direction='horizontal'>
                                        <Button className="mt-3 w-100" type="submit" disabled={isLoading} variant="dark">
                                            {isLoading ? 'Loading…' : 'Save'}
                                        </Button>
                                    </Stack>
                                    
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Products
