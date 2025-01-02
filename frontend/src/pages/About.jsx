import "../Components/About/About.css";
const About = () => {
  return (
    <div className="about-container">
      <div className="about-text">
        <h2>About TodoApp</h2>
        <p>
          TodoApp is a simple and efficient task management tool designed to
          help you stay organized and productive. With an intuitive interface,
          you can easily add, edit, and delete tasks. Manage your day-to-day
          activities with ease and never miss a deadline again!
        </p>
      </div>
      <div className="about-image">
        <img
          src="https://images.pexels.com/photos/9392309/pexels-photo-9392309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="TodoApp illustration"
        />
      </div>
    </div>
  );
};

export default About;
