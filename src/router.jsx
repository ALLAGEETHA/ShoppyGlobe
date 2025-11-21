// Router configuration using createBrowserRouter for better data handling
import { createBrowserRouter } from 'react-router-dom';
import React, { lazy } from 'react';
import App from './App';

// Lazy load components for code splitting and performance optimization
const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
const NotFound = lazy(() => import('./components/NotFound'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <ProductList /> },
        { path: 'products/:id', element: <ProductDetail /> },
        { path: 'cart', element: <Cart /> },
        { path: 'checkout', element: <Checkout /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);


export default router;
