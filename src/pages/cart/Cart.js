import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Stack, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/shared/layout/Layout';
import useCart from '../../hooks/useCart';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, subTotal, vat, total } = useCart();
    let n= 1;
    

    return (
        <>
            <Layout className="as_page_cart pt-4 pb-4">
                <section className=''>
                    <Container>
                        <Stack direction='horizontal'>
                            <h1>Cart</h1>

                            <Button className='ms-auto' onClick={()=> navigate('/shop')}>Back to shopping</Button>
                        </Stack>
                    </Container>

                    <Container>
                        {cart && (
                            <Table hover className='mt-3'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th></th>
                                        <th>Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cart.map( item => (
                                        <tr key={item?.key} className='mt-2 pb-2'>
                                            <td className='text-muted pt-3 pb-3'>
                                                {n++}
                                            </td>
                                            <td className='text-muted pt-3 pb-3'>
                                                {item.title}
                                            </td>
                                            <td className='text-muted pt-3 pb-3'>
                                                { item.price}
                                            </td>
                                            <td className='text-muted pt-3 pb-3'>
                                                {item.quantity}
                                            </td>
                                            <td className='text-muted pt-3 pb-3'></td>
                                            <td className='text-primary pt-3 pb-3'>
                                                {item.price * item.quantity}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>Subtotal</th>
                                        <th className='text-primary'>${subTotal}</th>
                                    </tr>
                                    
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th className='text-muted'>Vat</th>
                                        <th className='fw-normal'>${vat}</th>
                                    </tr>
                                    
                                    <tr className='text-primary'>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>Total</th>
                                        <th>
                                            ${total}
                                        </th>
                                    </tr>
                                </thead>
                            </Table>
                        )}
                        <Stack direction='horizontal'>
                            <Button className='w-25 ms-auto' onClick={ ()=> navigate(`/checkout`)}>CHECKOUT</Button>
                        </Stack>
                    </Container>
                    
                </section>
            </Layout>
        </>
    );
};

export default Cart;
