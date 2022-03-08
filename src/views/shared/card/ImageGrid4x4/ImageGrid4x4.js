import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';


const ImageGrid4x4 = ({title, data}) => {
    return (
        <>
            <section className='as_image_grid_4x4 as_sec pt-3 pb-3'>
                <div className='as_s_header mb-4'>
                    <Container>
                        <h4>{title}</h4>
                    </Container>
                </div>

                <div className='as_s_body'>
                    <Container>
                        {data && (
                            <Row>
                                {data.map(item=> (
                                    <Col key={item?._id} lg={2} md={2} sm={6} xs={6}>
                                        <Card className={`as_card${item?.title} p-3 mb-3 border`}>
                                            <Card.Img src={item?.image} alt={item?.title} />
                                        </Card>
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

export default ImageGrid4x4;
