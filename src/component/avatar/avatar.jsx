import React from 'react';

const Avatar = ({src}) => {
    return (
    <div className='user-avatar'>
    <img src={src} alt="avatar" />
    </div>
    );
};

export default Avatar;