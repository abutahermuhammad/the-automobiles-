import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ButtonGroup, Card, Dropdown, DropdownButton, Offcanvas, Table } from 'react-bootstrap'
import useAuth from '../../hooks/useAuth';


const Orders = () => {
    const [loading, setLoading] = useState(true);  // Component Loading State.
    const [orders, setOrders] = useState([]);  // Product List.
    const [show, setShow] = useState(false);  // Canvas State
    const [canvasData, setCanvasData] = useState({});  // Product List.
    const navigate = useNavigate();
    const { user, role, loggedin } = useAuth();
    let canvasData1, canvasDataRest;
    
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

    const showOrder = id => {
        /**
         * Filtering data from order list for showing into canvas.
         */
        setCanvasData(orders.filter(order=> order._id === id)[0]);
        setShow(true);
    }
        
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
                                    <th className="ps-3"></th>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Total Product</th>
                                    <th>Status</th>
                                    <th>Total Price</th>
                                    <th className="text-end pe-3"></th>
                                </tr>
                            </thead>
                            <tbody className="border-top-0">
                                {orders && orders.map((order, i) => (
                                    <tr key={order?._id}>
                                        <td className="ps-3">{++i}</td>
                                        <td className='fw-bold'>
                                            <span style={{cursor: 'pointer'}} onClick={ ()=> showOrder(order?._id)}>{(order?._id).toUpperCase()}</span>
                                        </td>
                                        <td>
                                            {`${new Date(order?.date).getDate()}/${new Date(order?.date).getMonth()}/${new Date(order?.date).getFullYear()}`}
                                        </td>
                                        <td>
                                            {(order?.cart).length}
                                        </td>

                                        <td>
                                            {((order?.status).toLowerCase() === 'pending') && (
                                                <span className="badge p-1 rounded-pill bg-warning">{order?.status}</span>
                                            )}
                                        </td>

                                        <td className='fw-bold'>{`${order?.orderPrice}`} USD</td>

                                        { (role === 'admin') && (                                         
                                            <td className="text-end pe-3">
                                                <DropdownButton variant="outline-dark" size='sm' as={ButtonGroup} title="Received">
                                                    <Dropdown.Item eventKey="1">Process</Dropdown.Item>
                                                    <Dropdown.Item eventKey="2">Delivery</Dropdown.Item>
                                                    <Dropdown.Item eventKey="3">Complete</Dropdown.Item>
                                                    <Dropdown.Item eventKey="4">Cancel</Dropdown.Item>
                                                </DropdownButton>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                                    
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )}


            {/* Offcanvas */}
            <Offcanvas className="w-75" show={show} placement="end" onHide={()=>setShow(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fs-2'>Order Details</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Table className='mb-0'>
                        <tbody>

                            {/* Order ID */}
                            <tr>
                                <th>ID</th>
                                <th colSpan={2}>: <span className='mark'>{canvasData?._id?.toUpperCase()}</span></th>
                            </tr>

                            {/* Order Status */}
                            <tr>
                                <th>Status</th>
                                <th colSpan={2}>: <span className='mark'>{canvasData?.status?.toUpperCase()}</span></th>
                            </tr>

                            {/* Order Placement Date */}
                            <tr>
                                <th>Date</th>
                                <th colSpan={2}>: <span className='mark'>{`${new Date(canvasData?.date).getDate()}/${new Date(canvasData?.date).getMonth()}/${new Date(canvasData?.date).getFullYear()}`}</span></th>
                            </tr>

                            {/* Customer Name */}
                            <tr>
                                <th>Name</th>
                                <td colSpan={2}>: {canvasData?.name}</td>
                            </tr>

                            {/* Customer Email */}
                            <tr>
                                <th>Phone</th>
                                <td colSpan={2}>: {canvasData?.phone}</td>
                            </tr>

                            {/* Customer Email */}
                            <tr>
                                <th>Email</th>
                                <td colSpan={2}>: {canvasData?.email}</td>
                            </tr>
                            
                            {/* Order Cart */}
                            {canvasData?.cart && canvasData?.cart.map((item, i)=> (
                                <tr>
                                    <th>
                                        {(i === 0) && ("Cart")}
                                    </th>
                                    <td>: <span className='fw-bold'>{item?.title}</span> x {item?.quantity}</td>
                                    <td>${(item?.price * item?.quantity).toFixed(2)}</td>
                                </tr>
                            ))}

                            {/* Customer Email */}
                            <tr>
                                <th>Total</th>
                                <td colSpan={2}>: {canvasData?.orderPrice}</td>
                            </tr>
                            
                        </tbody>
                    </Table>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Orders;
