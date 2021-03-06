import React from 'react';
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap';
import { BsBookmarkHeart } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { toURLString } from '../../../../utils/url.utils';
import CardProduct from '../CardProduct/CardProduct';

const CardProduct4x2 = ({title, products, cartHandler}) => {
    console.log(products)
    return (
        <>
            <section className='as_image_grid_4x4 as_sec pt-5 pb-5'>
                <div className='as_s_header mb-4'>
                    <Container>
                        <h2>{title}</h2>
                    </Container>
                </div>

                <div className='as_s_body'>
                    <Container>
                        {products && (
                            <Row>
                                {products.map(item=> (
                                    <Col key={item?._id} lg={3} md={3} sm={12} xs={12}>
                                        
                                        <CardProduct item={item} cartHandler={cartHandler} />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Container>
                </div>
            </section>
        </>
    );
};

export default CardProduct4x2;
