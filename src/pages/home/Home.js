import React from 'react';
import HomeBanner from '../../components/home/HomeBanner';
import HomeTopCategories from '../../components/home/HomeTopCategories';
import HomeWhyShopWith from '../../components/home/HomeWhyShopWith';
import CardProduct4x2 from '../../components/shared/card/CardProduct4x2/CardProduct4x2';
import ImageGrid4x4 from '../../components/shared/card/ImageGrid4x4/ImageGrid4x4';
import Layout from '../../components/shared/layout/Layout';
import { storeBrands } from '../../store/brand.store';
import { storeProducts } from '../../store/products.store';
import useCart from '../../hooks/useCart';

const Home = () => {
    const { setToCart } = useCart();

    return (
        <Layout className="as_page_login">
            <HomeBanner src="https://automotivesuperstore.com.au/media/gene-bluefoot/a/u/australiadaydeals5.jpg" alt="sdf"/>
            <HomeTopCategories />
            <HomeBanner src="https://automotivesuperstore.com.au/media/gene-bluefoot/1/4/1400x300clearance.jpg" url={`/`} alt="sdf"/>
            <CardProduct4x2 title={'Hot Deals'} products={storeProducts} cartHandler={setToCart}/>
            <CardProduct4x2 title={'My Wishlist'} products={storeProducts}/>
            <CardProduct4x2 title={'My Cart'} products={storeProducts}/>
            <ImageGrid4x4 title="Top Brands" data={storeBrands} />
            <HomeWhyShopWith />
        </Layout>
        
    );
};

export default Home;
