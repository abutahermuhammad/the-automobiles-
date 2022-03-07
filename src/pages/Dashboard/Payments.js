import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, Table, Offcanvas } from 'react-bootstrap'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import useAuth from '../../hooks/useAuth'


const Payments = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const { user, role, loggedin } = useAuth()
    const [payments, setPayments] = useState([])  // Testimonials List.
    
    useEffect( () => {
        /**
         * Products Parser.
         */
        // fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/products`)
        fetch(`${process.env.REACT_APP_API_URI}/payment`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('_token')}`
            },
        })
        .then(res=> res.json())
        .then(data=> {
            setPayments(data)
            setLoading(false)
        })
    }, [])

    useEffect(() => { 
        if (!user.email || loggedin === false) {
            navigate('/login')
        }
    })
        
    return (
        <>
            {(payments.length <= 0 && loading === true) && (<Card bg="black" text="primary"><Card.Body><Card.Text>Loading...</Card.Text></Card.Body></Card>)}
            {(payments.length <= 0 && loading === false) && (<Card bg="black" text="primary"><Card.Body><Card.Text>No user found</Card.Text></Card.Body></Card>)}
            {(payments.length > 0 && loading === false) && (
                <>
                    <Card className="border-0 shadow">
                        <Card.Header className="bg-black text-primary">
                            <Card.Title className="pt-2 fs-4">Payments</Card.Title>
                        </Card.Header>

                        <Card.Body className="p-0">
                            <Table hover>
                                <thead className="border-bottom-1">
                                    <tr>
                                        <th className="ps-3">#</th>
                                        <th>date</th>
                                        <th>Card</th>
                                        <th className="text-end pe-3">Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments && payments.map((payment, i) => (
                                        <tr key={payment?._id}>
                                            <td className="ps-3">{++i}</td>
                                            <td>
                                                <p>{payment?.date}</p>
                                            </td>
                                            <td>
                                                {payment?.card}
                                            </td>
                                            <td className="text-end pe-3">{payment?.cost}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </>
            )}
        </>
    )
}

export default Payments
