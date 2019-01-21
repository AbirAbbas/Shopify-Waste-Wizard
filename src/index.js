/*
  Author: Abir Abbas
  Date: 1/20/2019
  Time: 9:46pm (Guelph, Ontario)
*/

import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header/header";
import Search from "./components/search/search";
import "react-perfect-scrollbar/dist/css/styles.css";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      items: null
    };
  }

  //call API once and store data for future access
  componentWillMount() {
    var url =
      "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";

    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({ items: json });
      });

    document.title = "Shopify-Waste-Wizard"
  }

  //render header and search components
  render() {
    return (
      <div>
        <Header />
        <Search itemList={this.state.items} />
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById("root"));
