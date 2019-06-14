import React from 'react';
const withFruit= WrappedComponent=>{
    const obj={isSweet:true}
    return props=><WrappedComponent data={obj} {...props}></WrappedComponent>
}

export default withFruit;