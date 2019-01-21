import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./favorite.css";
import PerfectScrollbar from "react-perfect-scrollbar";

export default class Favorite extends React.Component {
  render() {
    console.log(this);
    return (
      <div className="container-fluid favorite">
        <h1 className="favorite-title">Favorites</h1>

        <PerfectScrollbar className="favorite-content-group">
          <div className="row search-result">
            <div className="col-6 row">
              <div className="col-2 search-star">
                <i className="fa fa-star" />
              </div>
              <div className="col-10 search-name">
                <p>Blue Bin (plastic takeout food and produce containers)</p>
              </div>
            </div>
            <div className="col-6 search-content">
              <ul>
                <li>
                  Empty and rinse (if necessary and possible) this item before
                  placing it in the Blue Bin.
                </li>
                <li>
                  Any type of black or compostable plastic is not accepted and
                  should be placed in the Garbage bin
                </li>
              </ul>
            </div>
          </div>
          <div className="row search-result">
            <div className="col-6 row">
              <div className="col-2 search-star">
                <i className="fa fa-star" />
              </div>
              <div className="col-10 search-name">
                <p>Blue Bin (plastic takeout food and produce containers)</p>
              </div>
            </div>
            <div className="col-6 search-content">
              <ul>
                <li>
                  Empty and rinse (if necessary and possible) this item before
                  placing it in the Blue Bin.
                </li>
                <li>
                  Any type of black or compostable plastic is not accepted and
                  should be placed in the Garbage bin
                </li>
              </ul>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}
