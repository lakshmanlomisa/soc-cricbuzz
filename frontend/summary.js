import React, { Component } from "react";
import Board from "./board";
class Summary extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount() {
    }
    
  render() {
    

    
    return (
      <React.Fragment>
        {this.props.show && (
          <div className="chart" >
            <div style= {{display: 'flex', justifyContent: 'right'}}>
                  <button onClick={this.props.onHide}>Close</button>
            </div>
            
            <Board/>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Summary;
