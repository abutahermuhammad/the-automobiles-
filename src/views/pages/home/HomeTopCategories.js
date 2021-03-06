import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { storeCats } from '../../../store/categories.store';
import { toURLString } from '../../../utils/url.utils';

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
                                        <Link to={`/shop/${toURLString(item?.title)}`}>
                                            <Card className='as_cat_card as_hvr_bg_primary mb-3 border'>
                                                <Card.Body>
                                                    <Row className='align-items-center'>
                                                        <Col lg={4} md={4} sm={12} xs={12}>
                                                            <img className='mb-sm-2 mb-xs-2' src={item?.icon} width={36} height={36} />
                                                        </Col>

                                                        <Col lg={8} md={8} sm={12} xs={12}>
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
