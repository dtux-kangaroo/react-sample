import React from 'react'
import withFruit from './withFruit'
const Banana=props=>(
    <div >
       <p>这个水果香蕉是{props.data.isSweet?"甜的":"酸的"}</p>
    </div>
)
export default withFruit(Banana);