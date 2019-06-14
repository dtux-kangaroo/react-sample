import React from 'react';
import useFruit  from './useFruit'
const Orange=()=> {
    const isSweet=useFruit();
    return (
      <>
        <p>这个橘子是{isSweet?"甜的":"酸的"}</p>
      </>
    );
  }

  export default Orange