import { Link } from "react-scroll";
import circles from "../Images/WelcomePageCircles.png";
import "../PS_Styles/WelcomePage.css";
function WelcomePageText() {
  return (
    <div className="welcomeTextContainer">
      <div className="welcomeTitleContainer">
        <div className="welcomeTitleText">
          I'm Estefan
          <span className="welcomeTitlePeriod">.</span>
        </div>
      </div>
      <p className="welcomeDescriptionText">
        Computer science student at The University of New Mexico. On my website
        you can view some of my personal projects, learn more about me, and get
        in touch, welcome!
      </p>
      <div className="moreAboutMeButton">
        <Link
          className="aboutNavLink"
          activeClass="active"
          to="AboutMe"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          More about me
        </Link>
      </div>
    </div>
  );
}
function WelcomePage() {
  return (
    <div id="WelcomePage" className="welcomeContainer">
      <WelcomePageText></WelcomePageText>
      <img className="circleImg" src={circles} alt=""></img>
    </div>
  );
}
export default WelcomePage;
