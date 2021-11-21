import { Link } from "react-scroll";
import "../PS_Styles/Navbar.css";

function Navbar() {
  return (
    <div className="navContainer">
      <div className="linkContainer">
        <Link
          className="navLink"
          activeClass="active"
          to="WelcomePage"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          HOME
        </Link>
        <Link
          className="navLink"
          activeClass="active"
          to="AboutMe"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          ABOUT ME
        </Link>
        <Link
          className="navLink"
          activeClass="active"
          to="Projects"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          PROJECTS
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
