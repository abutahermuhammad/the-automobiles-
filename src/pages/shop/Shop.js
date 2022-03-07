import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CardProduct4x2 from '../../components/shared/card/CardProduct4x2/CardProduct4x2';
import Layout from '../../components/shared/layout/Layout';
import useCart from '../../hooks/useCart';

const Shop = () => {
    const { setToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        let url = `${process.env.REACT_APP_API_URI}/product`;

        fetch(url)
        .then(res=> res.json())
        .then(data=> {
            setProducts(data.data);
            setLoading(false);
        });
        
        // console.log('products: ', products);
    }, []);

    return (
        <>
            <Layout className="as_shop">
                {loading ? (
                    <Container className="py-5">
                        <p>Loading</p>
                    </Container>
                ) : (
                    <CardProduct4x2 title={'Hot Deals'} products={products} cartHandler={setToCart}/>
                )}
                
            </Layout>
        </>
    );
};

export default Shop;
