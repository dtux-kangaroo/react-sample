import React from 'react'
export default class Fruit extends  React.Component{
  constructor(props){
      super(props);
      this.state={isSweet:true}
  }
  render() {
      return (
          <div>
              {this.props.render(this.state)}
          </div>
      )
  }
}