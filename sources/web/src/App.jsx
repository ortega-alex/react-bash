import React, { Suspense } from 'react';
import Navigation from './Navigation';

export default function App() {
    return (
        <React.StrictMode>
            <Suspense fallback={<div>Cargando ...</div>}>
                <Navigation />
            </Suspense>
        </React.StrictMode>
    );
}

