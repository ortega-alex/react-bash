import React from 'react';
import { Route, Routes } from 'react-router-dom';

export default function RoutesWithNotFound({ children }) {
    return (
        <Routes>
            {children}
            <Route
                path='*'
                element={
                    <div className='container' style={{ height: '100vh' }}>
                        <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                            <h1>404</h1>
                            <p>Not Fount {window.innerWidth}</p>
                        </div>
                    </div>
                }
            />
        </Routes>
    );
}
