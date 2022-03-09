import React from 'react';
import { Button, Col, NavDropdown, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useCart from '../../../hooks/useCart';

const NavCartData = () => {
    const {cart, clearCart} = useCart();

    return (
        <>
            {(cart?.length <= 0) && (
                <NavDropdown.Item className='text-center p-3'>No item in cart</NavDropdown.Item>
            )}

            {(cart?.length > 0) && cart.map(item => (
                <NavDropdown.Item key={item?._id} style={{width: 300}}>
                    <div>
                        <Row>
                            <Col lg={8} md={8} sm={8}>
                                <p className='text-wrap fw-bold' style={{fontSize: 14}}>{item?.title} x {item?.quantity}</p>
                            </Col>
                            <Col lg={4} md={4} sm={4} className="text-end">
                                <p className='text-primary'>
                                    ${item?.price}
                                </p>
                            </Col>
                        </Row>
                    </div>
                </NavDropdown.Item>
                
            ))}

            <NavDropdown.Divider />
            <Stack gap={3} direction="vertical" style={{width: 300}}>
                <Stack className="mx-2" gap={3} direction="horizontal">
                    <Link to={`/cart`} className="w-50 btn btn-outline-primary">
                        cart
                    </Link>

                    <Link to={`/checkout`} className="w-50 btn btn-primary">
                        Checkout
                    </Link>
                </Stack>

                {(cart?.length > 0) && (
                    <Button className="mx-2" variant="danger" onClick={() => clearCart()}>
                        Clear Cart
                    </Button>
                )}
                
            </Stack>
            
        </>
    );
};

export default NavCartData;
