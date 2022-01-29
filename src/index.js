import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.style.scss'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider';
import CartProvider from './contexts/CartProvider';
import OrderProvider from './contexts/OrderProvider';


ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>  {/* Authentication Provider */}
            <OrderProvider>
                <CartProvider>  {/* Cart Provider */}
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </CartProvider>
            </OrderProvider>
        </AuthProvider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
