import React from "react";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: "Check out this bundle.js"
    }
  }
  render(){
    return(
      <div className="App">
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;