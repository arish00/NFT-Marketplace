import React from 'react';

const Button = ({ btnName, classStyles, handleClick }) => (
  <button onClick={handleClick} type="button" className={`nft-gradient py-2 px-6 font-poppins text-sm font-semibold text-white minlg:px-8 minlg:text-lg ${classStyles}`}>
    {btnName}
  </button>
);

export default Button;
