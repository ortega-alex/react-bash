import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { resetSession } from '@/redux/state';
import { _SERVER } from '@/services';
import { PublicRoutes } from '@/models';

export default function Home() {
    const sessionState = useSelector(store => store.session);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='container'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <h1>Home</h1>
                <h3>Welcome {sessionState.user}</h3>
                <Button
                    onClick={() => {
                        dispatch(resetSession());
                        if (process.env.NODE_ENV !== 'development') window.location.href = _SERVER.baseUrl;
                        else navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
                    }}
                >
                    Close Session
                </Button>
            </div>
        </div>
    );
}
