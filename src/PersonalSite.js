import "./App.css";
import AboutMe from "./Components/AboutMe";
import Navbar from "./Components/Navbar";
import Projects from "./Components/Projects";
import WelcomePage from "./Components/WelcomePage";
import "./PS_Styles/Projects.css";
import "./PS_Styles/WelcomePage.css";

function PersonalSite() {
  return (
    <div className="m_container">
      <Navbar></Navbar>
      <WelcomePage></WelcomePage>
      <AboutMe></AboutMe>
      <Projects></Projects>
    </div>
  );
}

export default PersonalSite;
