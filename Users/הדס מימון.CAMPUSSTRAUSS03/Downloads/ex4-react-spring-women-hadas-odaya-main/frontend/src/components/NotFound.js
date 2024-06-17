import React from 'react';
import Wrapper from './Wrapper';

const NotFound = () => (
    <Wrapper>
    <div className='404 text-center'>
        <h1>Page not found 404</h1>
        <button className='btn btn-primary' onClick={() => window.location.href = '/'}>Go back to Home🏠</button>
    </div>
    </Wrapper>
);

export default NotFound;
