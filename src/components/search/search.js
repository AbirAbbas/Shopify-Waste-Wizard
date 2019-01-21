/*
  Author: Abir Abbas
  Date: 1/20/2019
  Time: 9:46pm (Guelph, Ontario)
*/

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./search.css";
import "./favorite.css";
import "font-awesome/css/font-awesome.min.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import _ from "lodash";
import ReactHtmlParser from 'react-html-parser';

export default class Search extends React.Component {

  //follow default behavior other than binding searchQuery function
  //to give access to "this" within the function
  constructor() {
    super();
    this.state = {
      display: null,
      favorites: [],
      favorite_output: null,
      output: null
    };

    this.searchQuery = this.searchQuery.bind(this);
  }

  //scan favorites and update favorite stars everytime the screen is rendered
  componentDidUpdate() {
    for (var k = 0; k < this.state.favorites.length; k++) {
      if (document.getElementById(this.state.favorites[k][0]) != null) {
        document.getElementById(this.state.favorites[k][0]).classList =
          "fa fa-star green";
      }
    }
  }

  //delete favorite event handler when click on stars at the bottom
  deleteFav(favorite) {
    for (var j = 0; j < this.state.favorites.length; j++) {
      if (this.state.favorites[j][0] === favorite[0]) {
        if (document.getElementById(favorite[0]) != null) {
          document.getElementById(favorite[0]).className = "fa fa-star";
        }

        this.state.favorites.splice(j, 1);
        this.state.favorite_output.splice(j, 1);
      }
    }
    this.forceUpdate();
  }


  //query a search within the existing state containing all records
  //return only the ones that match the keywords
  searchQuery(e) {

    var keywords = document.getElementById("keywords-input").value;

    //dont allow searches without keywords
    if (keywords === "") {
      alert("Please enter a keyword to search");
    } else {
      // eslint-disable-next-line
      this.state.display = [];

      //push all elements that have matching keywords into the array which will be used to display content
      for (var i = 0; i < this.props.itemList.length; i++) {
        if (this.props.itemList[i].keywords.includes(keywords.toLowerCase())) {
          this.state.display.push([
            this.props.itemList[i].title,
            this.props.itemList[i].body
          ]);
        }
      }

      //convert the array containing all elements to be displayed into a HTML format so the browser may render it
      var output = _.map(this.state.display, display => {
        var color = {
          color: "grey"
        };

        return (
          <div key={display[0]} className="row search-result">
            <div className="col-6 row">
              <div className="col-2 search-star">
                <i
                  style={color}
                  id={display[0]}
                  className="fa fa-star"
                  onClick={event => {
                    var foundFav = false;
                    //check if currently selected favorite already exists, if not then add it
                    for (var x = 0; x < this.state.favorites.length; x++) {
                      if (this.state.favorites[x][0] === display[0]) {
                        foundFav = true;
                        break;
                      }
                    }

                    //favorite doesn't exist therefore, add it
                    if (foundFav === false) {
                      event.target.className += " green";
                      // eslint-disable-next-lin
                      this.state.favorites.push([display[0], display[1]]);
                      // eslint-disable-next-line
                      this.state.favorite_output = [];
                      // eslint-disable-next-line
                      this.state.favorite_output = _.map(
                        this.state.favorites,
                        favorite => {
                          return (
                            <div key={favorite[0]} className="row search-result">
                              <div className="col-6 row">
                                <div className="col-2 search-star">
                                  <i
                                    className="green fa fa-star"
                                    onClick={() => this.deleteFav(favorite)}
                                  />
                                </div>
                                <div className="col-10 search-name">
                                  <p>{favorite[0]}</p>
                                </div>
                              </div>
                              <div className="col-6 search-content">
                                {ReactHtmlParser(ReactHtmlParser(favorite[1]))}
                              </div>
                            </div>
                          );
                        }
                      );
                    }
                    this.forceUpdate();
                  }}
                />
              </div>
              <div className="col-10 search-name">
                <p>{display[0]}</p>
              </div>
            </div>
            <div className="col-6 search-content">
              {
                //for some odd reason it would display HTML tags as raw if this function wasn't called twice
                ReactHtmlParser(ReactHtmlParser(display[1]))
              }
            </div>
          </div>
        );
      });
      // eslint-disable-next-line
      this.state.output = output;
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid search">
          <div className="row">
            <div className="search-form" action="">
              <input
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    // Do code here
                    this.searchQuery();
                  }
                }}
                onChange={(event) => {
                  if (event.target.value === '') {
                    // eslint-disable-next-line
                    this.state.output = "";
                    this.forceUpdate();
                  }
                }
                }
                id="keywords-input"
                type="text"
                className="form-control search-input"
                placeholder="Text input"
              />
              <button
                className="search-button-square"
                type="submit"
                onClick={this.searchQuery}
              >
                <i className="fa fa-search" />
              </button>
            </div>
          </div>

          <PerfectScrollbar className="search-result-group container-fluid">
            <div id="display-content">{this.state.output}</div>
          </PerfectScrollbar>
        </div>
        <div className="container-fluid favorite">
          <h1 className="favorite-title">Favorites</h1>

          <PerfectScrollbar className="favorite-content-group">
            <div id="display-favorite">{this.state.favorite_output}</div>
          </PerfectScrollbar>
        </div>
      </div>
    );
  }
}
