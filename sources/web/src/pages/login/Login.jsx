import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setSession } from '@/redux/state';
import { PrivateRoutes } from '@/models';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div className='container'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <h1>Login</h1>
                <Button
                    onClick={() => {
                        dispatch(setSession({ session: { id: 1, user: 'm.ortega' }, token: '123' }));
                        navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
                    }}
                >
                    Login
                </Button>
            </div>
        </div>
    );
}