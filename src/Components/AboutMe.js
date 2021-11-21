import logo from "../Images/AboutMeTitle.png";
import "../PS_Styles/AboutMe.css";
function AboutMe() {
  return (
    <div id="AboutMe" className="aboutContainer">
      <img className="aboutMeTitleImg" src={logo} alt=""></img>
      <div className="aboutMeDescriptions">
        <h2 className="h2"> Background </h2>
        <p className="text">
          I've been coding for 3 years now in my junior year of college. I have
          a strong background in Object Oriented Programming and memory
          management in languages like Java, C/C++, and Python. My language of
          choice is Java though I enjoy Python for its incredible libraries, and
          C/C++ for their performance and memory accessibility.
        </p>
        <p className="text">
          I currently intern for a Biosafety business where I've had time to
          write automation programs, work with Amazon Web Services, and research
          and implement Machine Learning programs. Additionally I've developed a
          working knowledge of Git and version control for development.
        </p>
        <h2 className="h2"> Web Development </h2>
        <p className="text">
          In the last year I've increased my activity and experience in the
          development of web applications. At the moment my Javascript framework
          of choice is ReactJS. With ReactJS I've gained experience fetching
          data from API's, managing the UI with CSS and React Components, and
          creating dynamic web applications.
        </p>
        <h2 className="h2"> ML and Automation </h2>
        <p className="text">
          I enjoy Java and Python for any utility program I'm working on. I will
          regularly use Java or Python for spreadsheet, document, or browser
          automation with packages like Apache POI, Pandas, and Selenium. I have
          also spent time working on programs for Machine Learning. These
          programs include a Linear Regression model in C++, and natural
          language processing programs in Python with TensorFlow and Pytorch.
        </p>
        <h2 className="h2">Contact Me</h2>
        <p className="text">Email: estefan.dev@gmail.com</p>
      </div>
    </div>
  );
}
export default AboutMe;
