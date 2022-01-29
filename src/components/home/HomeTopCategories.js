import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { storeCats } from '../../store/categories.store';

const HomeTopCategories = () => {
    return (
        <>
            <section className='as_sec as_home_top_cat pt-5 pb-5'>
                <div className='as_s_body'>
                    <Container>
                        {storeCats && (
                            <Row>
                                {storeCats.map(item=> (
                                    <Col key={item?._id} lg={3} md={3} sm={6} xs={6}>
                                        <Link to={item?.url}>
                                            <Card className='as_cat_card as_hvr_bg_primary mb-3 border'>
                                                <Card.Body>
                                                    <Row className='align-items-center'>
                                                        <Col lg={4} md={4} sm={4} xs={8}>
                                                            <img src={item?.icon} width={36} height={36} />
                                                        </Col>

                                                        <Col lg={8} md={8} sm={8} xs={8}>
                                                            <Card.Title className='fs-6 mb-0'>{item?.title}</Card.Title>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Link>
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

export default HomeTopCategories;
