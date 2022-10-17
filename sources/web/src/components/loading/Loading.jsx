import React from 'react';
import './Loading.css';

export function Loading() {
    return (
        <div className='lds-container'>
            <div className='lds-ripple'>
                <div />
                <div />
            </div>
        </div>
    );
}