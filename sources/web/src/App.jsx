import React, { Suspense } from 'react';

export default function App() {
    return (
        <React.StrictMode>
            <Suspense fallback={<div>Cargando ...</div>}>
                App
            </Suspense>
        </React.StrictMode>
    );
}

