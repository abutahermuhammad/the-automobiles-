import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { storeCats } from '../../store/categories.store';

const HomeWhyShopWith = () => {
    return (
        <>
            <section className='as_sec pt-5 pb-5'>
                <div className='as_s_header mb-5'>
                    <Container>
                        <h2 className='text-center'>Why Shop with The Automobils</h2>
                    </Container>
                </div>

                <div className='as_s_body'>
                    <Container>
                        {storeCats && (
                            <Row>
                                <Col  lg={4} md={4} sm={12} xs={12}>
                                    <div className='mb-5 pe-lg-4'>
                                        <img className='mb-3' src="https://automotivesuperstore.com.au/media/gene-bluefoot/s/u/support.png" />
                                        <h3 className='mb-3'>Support</h3>
                                        <p>As an authorised distributor with direct links to the manufacturer, you have the full backing that you only get via official channels; i.e. full access to official warranty backup, access to official product upgrades (where applicable), installation tips and guides direct from the people who design and make the product, and the advice and backup that you get from being a valued member of a community who are proud to use the highest quality products available in their vehicles.</p>
                                    </div>
                                </Col>
                                <Col  lg={4} md={4} sm={12} xs={12}>
                                    <div className='mb-5 ps-lg-3 pe-lg-4'>
                                        <img className='mb-3' src="https://automotivesuperstore.com.au/media/gene-bluefoot/w/a/warranty-yellow.png" />
                                        <h3 className='mb-3'>Warranty</h3>
                                        <p>When purchasing products from Automotive Superstore you have access to not only the full, official manufacturer's comprehensive warranties - and all that they entail - but we are also your local point of contact, no need to ship items back and forth to manufacturers overseas!</p>
                                    </div>
                                </Col>
                                <Col  lg={4} md={4} sm={12} xs={12}>
                                    <div className='mb-5 ps-lg-3'>
                                        <img className='mb-3' src="https://automotivesuperstore.com.au/media/gene-bluefoot/m/u/multiple-users.png" />
                                        <h3 className='mb-3'>Product Know-How</h3>
                                        <p>Automotive Superstore staff are trained by the manufacturers of the products we sell in order to know them inside and out. This ensures you always get the product that is ideal for your specific application, no more wasting time and money buying things that don't work!</p>
                                    </div>
                                </Col>
                            </Row>
                        )}
                        
                    </Container>
                </div>
            </section>
        </>
    );
};

export default HomeWhyShopWith;
