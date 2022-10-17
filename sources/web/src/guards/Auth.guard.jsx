import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { PublicRoutes } from '@/models';

export const AuthGuard = () => {
    const sessionState = useSelector(state => state.session);
    return sessionState ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />;
};

export default AuthGuard;
