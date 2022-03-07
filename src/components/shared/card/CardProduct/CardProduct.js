import React from 'react';
import { Button, Card, Stack } from 'react-bootstrap';
import { BsBookmarkHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { toURLString } from '../../../../utils/url.utils';

const CardProduct = ({cartHandler, item}) => {
    return (
        <>
            <Card className={`as_card_${item?._id} mb-4 border`}>
                <Card.Img src={item?.image} alt={item?.title} />
                <Card.Body>
                    
                    {/* <link to={`/shop/${item?.categorie}/${item?._id}`}> */}
                        <Card.Title className='text-center fs-6'>
                            <Link to={`/shop/${toURLString(item?.categorie)}/${item._id}/${toURLString(item?.title)}`}>
                                {item?.title}
                            </Link>
                        </Card.Title>
                    {/* </link> */}

                    <Card.Text className='text-center'>
                        {item?.price?.special && (
                            <Stack direction='horizontal' gap={4}>
                                <p className='text-muted ms-auto'><del>{item?.price?.currency}{item?.price?.reguler}</del></p> 
                                <p className='text-primary me-auto fw-bold'>{item?.price?.currency}{item?.price?.special} </p> 
                            </Stack>
                        )}

                        {!item?.price?.special && (
                            <Stack className='mx-auto' direction='horizontal' gap={4}>
                                <p className='text-primary m-auto text-center fw-bold'>${item?.price?.reguler} </p> 
                            </Stack>
                        )}
                    </Card.Text>
                    
                    <Stack direction='horizontal' gap={2}>
                        {/* Add to Cart Button */}
                        <Button 
                            className='w-75'
                            onClick={() => cartHandler(item?._id, item?.title, item?.price?.special ? item?.price?.special : item?.price?.reguler)} 
                            variant="outline-primary">
                            Add to Cart
                        </Button>

                        {/* Add Wishlist Button */}
                        <Button className='w-25' variant="outline-primary">
                            <BsBookmarkHeart />
                        </Button>
                    </Stack>
                </Card.Body>
            </Card>
        </>
    );
};

export default CardProduct;
