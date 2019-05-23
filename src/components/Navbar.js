import React, { Component } from "react";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }

  makeIncrementer = amount => {
    const { count } = this.state;
    this.setState({
      count: count + amount
    });
  };

  // increment = this.makeIncrementer(1);
  // decrement = this.makeIncrementer(-1);

  increment = () => this.makeIncrementer(1);

  decrement = () => this.makeIncrementer(-1);

  render() {
    const { increment, decrement } = this;
    const { count } = this.state;
    return (
      <div>
        <p>Count: {count}</p>
        <button type="button" className="increment" onClick={increment}>
          Increment count
        </button>
        <button type="button" className="decrement" onClick={decrement}>
          Decrement count
        </button>
      </div>
    );
  }
}

export default Navbar;

// export default class Navbar extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       expand: "md",
//       position: null,
//       bgColor: "rgb(240,240,240)",
//       textColor: "rbg(100,100,100)",
//       isOpen: false
//     };
//   }

//   render() {
//     return (
//       <div id="Navbar">
//         <p>테스트입니다.</p>
//       </div>
//     );
//   }
// }
