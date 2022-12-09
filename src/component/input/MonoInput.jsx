import React from 'react';

const MonoInput = ({...otherProps}) => {
    return (
      <div className={otherProps.className}>
        <span>{otherProps.span}</span>
        <input {...otherProps} />
      </div>
    );
};

export default MonoInput;