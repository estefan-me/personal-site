import { MenuItem } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/search.png";
import "../PS_Styles/Projects.css";
import "../PS_Styles/WelcomePage.css";

function Projects() {
  const button_style = {
    width: "200px",
    fontSize: "x-large",
    fontWeight: "900",
    fontFamily: '"Montserrat", sans-serif',
  };
  return (
    <div id="Projects" className="projectContainer">
      <div className="title">Projects</div>
      <div className="projectCard">
        <div className="projectCardHeader">Shortest Path Search Visualizer</div>
        <img className="image" src={logo} alt=""></img>
        <p className="descrText">
          The Shorest Path Visualizer demonstrates shortest path finding
          algorithms at work on a grid. Built with ReactJS, this project
          provides a responsive and dynamic user interface for selecting a
          search type, placing start and end points, drawing obstacles and
          borders, and visualizing the search algorithm at work.
        </p>
        <MenuItem
          style={button_style}
          className="projectLink"
          component={Link}
          to={"/search_visualizer"}
        >
          Try it out HERE
        </MenuItem>
      </div>
    </div>
  );
}
export default Projects;
