import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import useAuth from '../../hooks/useAuth';


const Orders = () => {
    const [loading, setLoading] = useState(true);  // Component Loading State.
    const [orders, setOrders] = useState([]);  // Product List.
    const navigate = useNavigate();
    const { user, role, loggedin } = useAuth();
    
    useEffect( () => {
        /**
         * Orders Parser.
         */
        // fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/products`)
        const url = (role === 'admin') 
            ? `${process.env.REACT_APP_API_URI}/order`
            : `${process.env.REACT_APP_API_URI}/order?email=${user?.email}`

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('_token')}`
            },
        })
        .then(res=> res.json())
        .then(data=> {
            setOrders(data);
            setLoading(false);
        });
    }, [])

    useEffect(() => { 

        if (!user.email || loggedin === false) {
            navigate('/login')
        }
    })
        
    return (
        <>
            {(loading === true && orders.length <= 0) && (<Card bg="black" text="primary"><Card.Body><Card.Text>Loading...</Card.Text></Card.Body></Card>)}
            {(loading === false && orders.length <= 0) && (<Card bg="black" text="primary"><Card.Body><Card.Text>No order found!</Card.Text></Card.Body></Card>)}
            {(orders.length > 0 && loading === false) && (
                <Card className="border-0 shadow">

                    <Card.Header className="bg-black text-primary">
                        <Card.Title className="pt-2 fs-4">Orders</Card.Title>
                    </Card.Header>

                    <Card.Body className="p-0">
                        <Table hover >
                            <thead className="border-bottom-1">
                                <tr>
                                    <th className="ps-3">#</th>
                                    <th>Product</th>
                                    <th>date</th>
                                    <th>User</th>
                                    <th>Address</th>
                                    <th className="text-end pe-3">Price</th>
                                </tr>
                            </thead>
                            <tbody className="border-top-0">
                                {orders && orders.map((order, i) => (
                                    <tr key={order?._id}>
                                        <td className="ps-3">{++i}</td>
                                        <td>
                                            {order?.productTitle}
                                            {order?._id}
                                        </td>
                                        <td>
                                            {order?.date}
                                        </td>
                                        <td>
                                            <p className="mb-1"><strong>{order?.name}</strong></p>
                                            <p className="mb-1">{order?.name}</p>
                                            <p className="mb-1">{order?.phone}</p>
                                        </td>
                                        <td>
                                            <p className="mb-1">{order?.address}</p>
                                            <p className="mb-1">{order?.address1}</p>
                                        </td>
                                        <td className="text-end pe-3">{`${order?.productPrice}`}</td>
                                    </tr>
                                ))}
                                    
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )}
        </>
    )
}

export default Orders;
