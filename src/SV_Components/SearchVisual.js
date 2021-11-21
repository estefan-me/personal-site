import React from "react";
import "../SV_Styles/GridStyles.css";
import "../SV_Styles/HeaderStyles.css";
import { A_STAR, BFS } from "./Algorithms";
import { DropButton, Dropmenu, MenuItem } from "./Dropmenu";

export default class SearchVisual extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      placingSrc: false,
      placingDest: false,
      drawingBorder: false,
      clearingBorder: false,
      src: 204,
      dest: 220,
      isInteractive: true,
      borders: new Array(500),
      timeOuts: [],
      searchType: "Breadth-First Search",
    };
    this.search = this.search.bind(this);
    this.reset = this.reset.bind(this);
    this.clearWalls = this.clearWalls.bind(this);
  }

  getAnimations() {
    if (this.state.searchType === "Breadth-First Search") {
      return BFS(this.state.src, this.state.dest, this.state.borders);
    } else if (this.state.searchType === "A* - Manhattan Distance") {
      return A_STAR(this.state.src, this.state.dest, this.state.borders);
    }
  }

  search() {
    this.setState({ isInteractive: false });

    const animations = this.getAnimations();

    const squares = document.getElementsByClassName("square");

    var speed = 50;
    for (var i = 0; i < animations.length; i++) {
      const curr_level = animations[i];
      if (i === animations.length - 1) {
        for (let j = 1; j < curr_level.length; j++) {
          var a = setTimeout(() => {
            squares[curr_level[j]].style.background = "#800000";
          }, speed + 250);
          this.state.timeOuts.push(a);
          speed += 10;
        }
        return;
      } else {
        var b = setTimeout(() => {
          for (let x = 0; x < curr_level.length; x++) {
            squares[curr_level[x]].style.background = "#444444";
            var c = setTimeout(() => {
              squares[curr_level[x]].style.background = "gray";
            }, 250);
          }
          this.state.timeOuts.push(c);
        }, speed);
        this.state.timeOuts.push(b);
      }
      speed += 10;
    }
  }

  reset() {
    const squares = document.getElementsByClassName("square");

    for (var j = 0; j < this.state.timeOuts.length; j++) {
      clearTimeout(this.state.timeOuts[j]);
    }

    this.setState({ isInteractive: true, timeOuts: [] });

    setTimeout(() => {
      for (var i = 0; i < squares.length; i++) {
        var is_src = i === this.state.src;
        var is_dest = i === this.state.dest;
        if (this.state.borders[i] || is_src || is_dest) continue;
        squares[i].style.background = "none";
      }
    }, 250);
  }

  clearWalls() {
    const squares = document.getElementsByClassName("square");
    var new_borders = Array.from(this.state.borders);
    for (var i = 0; i < squares.length; i++) {
      if (this.state.borders[i]) {
        new_borders[i] = false;
        squares[i].style.background = "none";
      }
    }
    this.setState({ borders: new_borders });
  }

  getColor(sqr_idx) {
    if (sqr_idx === this.state.src) return "#77815C";
    else if (sqr_idx === this.state.dest) return "#820D2D";
    else return "none";
  }

  drawBorder(e, sqr_idx) {
    var new_borders = Array.from(this.state.borders);
    new_borders[sqr_idx] = true;
    this.setState({ borders: new_borders });
    return changeColor(e, "black");
  }
  eraseBorder(e, sqr_idx) {
    var new_borders = Array.from(this.state.borders);
    new_borders[sqr_idx] = false;
    this.setState({ borders: new_borders });
    revert(e);
  }

  handleMouseOver(e, sqr_idx) {
    var is_src = sqr_idx === this.state.src;
    var is_dest = sqr_idx === this.state.dest;
    var should_erase = this.state.clearingBorder && this.state.borders[sqr_idx];
    var should_draw = this.state.drawingBorder && !is_dest && !is_src;

    if (should_erase) return this.eraseBorder(e, sqr_idx);
    else if (should_draw) return this.drawBorder(e, sqr_idx);
    else if (this.state.borders[sqr_idx]) return;
    else if (this.state.placingSrc && is_dest) return;
    else if (this.state.placingDest && is_src) return;
    else if (is_dest || is_src) return;
    else if (this.state.placingSrc) return changeColor(e, "#77815C");
    else if (this.state.placingDest) return changeColor(e, "#820d2d");
    else return changeColor(e, "grey");
  }

  handleMouseDown(e, index) {
    e.preventDefault();
    var is_src = this.state.src === index;
    var is_dest = this.state.dest === index;
    var placing = this.state.placingDest || this.state.placingSrc;

    if (this.state.borders[index] && !placing) {
      this.setState({ clearingBorder: true });
      return this.eraseBorder(e, index);
    } else if (!placing && !is_dest && !is_src) {
      this.setState({ drawingBorder: true });
      return this.drawBorder(e, index);
    } else if (this.state.placingSrc && !is_dest) {
      this.eraseBorder(e, index);
      changeColor(e, "#77815C");
      this.setState({ src: index, placingSrc: false });
    } else if (this.state.placingDest && !is_src) {
      this.eraseBorder(e, index);
      changeColor(e, "#820D2D");
      this.setState({ dest: index, placingDest: false });
    } else if (is_src && !this.state.placingDest) {
      changeColor(e, "#B3FFCC");
      this.setState({ placingSrc: true });
    } else if (is_dest && !this.state.placingSrc) {
      changeColor(e, "#F97777");
      this.setState({ placingDest: true });
    }
  }

  handleMouseLeave(e, index) {
    var is_dest = index === this.state.dest;
    var is_src = index === this.state.src;

    if (this.state.clearingBorder && this.state.borders[index]) {
      return this.eraseBorder(e, index);
    } else if (is_dest || is_src || this.state.borders[index]) return;

    revert(e);
  }

  handleMouseUp(e, index) {
    this.setState({ drawingBorder: false, clearingBorder: false });
  }

  render() {
    var sqr_indexes = [];
    for (var i = 0; i < 500; i += 1) {
      sqr_indexes.push(i);
    }
    return (
      <div className="mainContainer">
        <div className="gridContainer">
          <div className="gridHeader">
            <DropButton text={this.state.searchType}>
              <Dropmenu>
                <MenuItem
                  onClick={(event) => {
                    this.setState({ searchType: "Breadth-First Search" });
                  }}
                >
                  Breadth-First Search
                </MenuItem>

                <MenuItem
                  onClick={(event) => {
                    this.setState({ searchType: "A* - Manhattan Distance" });
                  }}
                >
                  A* - Manhattan Distance
                </MenuItem>
              </Dropmenu>
            </DropButton>
            <button className="headerButton" onClick={this.search}>
              Search
            </button>
            <button className="headerButton" onClick={this.clearWalls}>
              Clear Walls
            </button>
            <button className="headerButton" onClick={this.reset}>
              Reset
            </button>
          </div>
          {sqr_indexes.map((i) => (
            <div
              className="square"
              key={i}
              style={{ background: this.getColor(i) }}
              onMouseLeave={(event) =>
                this.state.isInteractive ? this.handleMouseLeave(event, i) : ""
              }
              onMouseDown={(event) =>
                this.state.isInteractive ? this.handleMouseDown(event, i) : ""
              }
              onMouseUp={(event) =>
                this.state.isInteractive ? this.handleMouseUp(event, i) : ""
              }
              onMouseOver={(event) =>
                this.state.isInteractive ? this.handleMouseOver(event, i) : ""
              }
            />
          ))}
        </div>
      </div>
    );
  }
}
function changeColor(e, color) {
  e.target.style.background = color;
}
function revert(e) {
  e.target.style.background = "none";
}
