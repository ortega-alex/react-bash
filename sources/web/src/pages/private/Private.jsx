import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { PrivateRoutes } from '@/models';
import { RoutesWithNotFound } from '@/components';

const Home = lazy(() => import('./home/Home'));

export default function Private() {
    return (
        <RoutesWithNotFound>
            <Route path='/' element={<Navigate to={PrivateRoutes.HOME} />} />
            <Route path={PrivateRoutes.HOME} element={<Home />} />
        </RoutesWithNotFound>
    )
}
