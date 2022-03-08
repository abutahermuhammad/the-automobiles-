import { FormikConsumer } from 'formik';
import React from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { storeFooter } from '../../../store/footer.store';

const Footer = () => {
    return (
        <footer>
            <Container className='pt-5 pb-5'>
                <Row>
                    {/* Branding Area */}
                    <Col lg={3} md={3} sm={12} xs={12}>
                        <div className='as_footer_wgt'>
                            <h1 className='fs-4'>The Automobiles</h1>
                            <p>6/3 Packard Ave<br/>
                            Castle Hill NSW 2154<br/>
                            Australia</p>
                        </div>
                    </Col>

                    {/* Footer Menu Area */}
                    <Col lg={6} md={6} sm={6} xs={12}>
                        <div className='as_footer_wgt'>
                            <h3 className='fs-5 mb-3'>Keep in touch</h3>
                            <Row>
                                <Col lg={4} md={4} sm={6} xs={12} >
                                    <div className='as_footer_menu_wgt'>
                                        {(storeFooter[0].length > 0) && (
                                            <Stack direction='vertical' gap={2}>
                                                {storeFooter[0].map(data => (
                                                    <Link key={data?._id} to={data?.url}>
                                                        {data?.title}
                                                    </Link>
                                                ))} 
                                            </Stack>
                                        )}
                                    </div>
                                </Col>
                                
                                <Col lg={4} md={4} sm={6} xs={12} >
                                    <div className='as_footer_menu_wgt'>
                                        {(storeFooter[1].length > 0) && (
                                            <Stack direction='vertical' gap={2}>
                                                {storeFooter[1].map(data => (
                                                    <Link key={data?._id} to={data?.url}>
                                                        {data?.title}
                                                    </Link>
                                                ))} 
                                            </Stack>
                                        )}
                                    </div>
                                </Col>
                                
                                <Col lg={4} md={4} sm={6} xs={12} >
                                    <div className='as_footer_menu_wgt'>
                                        {(storeFooter[2].length > 0) && (
                                            <Stack direction='vertical' gap={2}>
                                                {storeFooter[2].map(data => (
                                                    <Link key={data?._id} to={data?.url}>
                                                        {data?.title}
                                                    </Link>
                                                ))} 
                                            </Stack>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    {/* Contact Area */}
                    <Col lg={3} md={3} sm={12} xs={12}>
                        <div className='as_footer_wgt'>
                            <h3 className='fs-5 mb-3'>Keep in touch</h3>
                            <p>6/3 Packard Ave<br/>
                            Castle Hill NSW 2154<br/>
                            Australia</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <hr />

            <Container className='as_footer_copy pb-3'>
                <p className='fs-6 text-center'>© 2021 The Automobiles. All right reserved.</p>
            </Container>
        </footer>
    );
};

export default Footer;
