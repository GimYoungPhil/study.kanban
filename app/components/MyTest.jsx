import React from 'react';

export default class MyTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hi: 'hello'
    };
    console.log(this.props);
  }
  render() {
    var name = this.props.nameStr;
    var age = this.props.ageInt;
    return (
      <div>
        {`My Test : My name is ${name}. I'm ${age}.`}
        <button onClick={this.sing}>Sing!</button>
      </div>
    )
  }
  sing = () => {
    console.log(this.props.nameStr);
  }
}
