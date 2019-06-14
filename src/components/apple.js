import React from 'react'
export default class Apple extends  React.Component{
  constructor(props){
      super(props);
  }
  render() {
      console.log(this.props);
      return (
          <div>
              <p>这个水果是{this.props.data.isSweet?"甜的":"酸的"}</p>
          </div>
      )
  }
}