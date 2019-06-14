import React ,{ useState } from 'react';
import './style.scss'
import Header from 'component/header'
import Count from 'component/count'
import CountReduce from 'component/countReduce'
import InputRef from 'component/inputRef'
import Fruit from 'component/Fruit'
import Apple from 'component/Apple'
import Banana from 'component/banana'
import Orange from 'component/orange'
import { Chart, Axis, Geom, Tooltip } from 'bizcharts'
export default class Home extends React.Component{
    
    render(){
        return <div className="test">
                 <Header/>
                 <Count></Count>
                 <CountReduce></CountReduce>
                 <InputRef></InputRef>
                 <Fruit  render={ data=>(
                        <Apple data={data}></Apple>
                        )}/>
                  <Banana></Banana>
                  <Orange></Orange>
        </div>
    }
}