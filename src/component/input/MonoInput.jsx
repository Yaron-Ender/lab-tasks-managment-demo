import React from 'react';

const MonoInput = ({...otherProps}) => {
    return (
      <div className="input-mono-container">
        <span>{otherProps.span}</span>
        <input {...otherProps} />
      </div>
    );
};

export default MonoInput;