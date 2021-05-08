import React, { Component } from "react";
import logo from "./focus-logo.svg";
import "./App.css";
import TableContent from "./comopnents/tableContent";
import DataVisualizer from "./comopnents/dataVisualizer";
import Divider from "@material-ui/core/Divider";
import * as d3 from "d3";
import GrapheneData from "./data/Graphene_result.csv";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grapheneJSON: [],
    };
  }
  componentDidMount() {
    d3.csv(GrapheneData).then((data) => {
      debugger;
      this.setState({ grapheneJSON: data });
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Focus</h1>
        </div>
        <div className="container">
          <div className="classifier-wrapper">
            <h2>Search for Graphene</h2>
            <p className="less-padding">
              This classifier is configured for fetching all the patents for
              Graphene across the world.
            </p>
            <span className="grayish">Version: 1 , not trained</span>
            <span className="grayish">Status : Draft</span>
          </div>
          <DataVisualizer grapheneJSON={this.state.grapheneJSON} />
          <Divider />
          <div className="table-results">
            <TableContent grapheneJSON={this.state.grapheneJSON} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
