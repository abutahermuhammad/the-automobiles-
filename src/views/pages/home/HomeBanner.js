import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomeBanner = ({src, alt, url}) => {
    return (
        <>
            <section className='as_sec as_home_banner'>
                <Container className="container-md">
                    {/* <Link to={url}> */}
                        <img className='w-100' src={src} alt={alt} />
                    {/* </Link> */}
                </Container>
            </section>
        </>
    );
};

export default HomeBanner;
