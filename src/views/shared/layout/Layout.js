import React from 'react';
import Footer from '../footer/Footer';
import Navigation from '../navigation/Navigation';

const Layout = ({className, children}) => {
    return (
        <>
            
            <Navigation />

            <main className={`as_page ${className && className}`}>
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default Layout;
