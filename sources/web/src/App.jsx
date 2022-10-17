import React, { lazy, Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { HashRouter, Navigate, Route } from 'react-router-dom';

import { Loading, RoutesWithNotFound } from './components';
import store from './redux/store';
import { Theme } from './styled-components';
import { PrivateRoutes, PublicRoutes } from './models';
import { AuthGuard } from './guards';
import { PublicPrivateInterceptor } from './interceptors';

const Login = lazy(() => import('@/pages/login/Login'));
const Private = lazy(() => import('@/pages/private/Private'));

export default function App() {

    useEffect(() => {
        PublicPrivateInterceptor();
    }, []);

    return (
        <React.StrictMode>
            <Suspense fallback={<Loading />}>
                <Provider store={store}>
                    <ThemeProvider theme={Theme}>
                        <HashRouter>
                            <RoutesWithNotFound>
                                <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE} />} />
                                <Route path={PublicRoutes.LOGIN} element={<Login />} />
                                <Route element={<AuthGuard />}>
                                    <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
                                </Route>
                            </RoutesWithNotFound>
                        </HashRouter>
                    </ThemeProvider>
                </Provider>
            </Suspense>
        </React.StrictMode>
    );
}

