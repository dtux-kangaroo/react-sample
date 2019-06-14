import React, {useState} from  'react'
function useFruit() {
    const [isSweet,setFruit]=useState(false);
    return isSweet;
}

export default useFruit;