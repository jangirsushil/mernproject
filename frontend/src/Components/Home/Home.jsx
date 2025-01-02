import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const Navigate = useNavigate();
  return (
    <div className="container">
      <div className="items">
        <h1>
          Organize Your
          <br />
          Work and Life, Finally
        </h1>
        <p>
          Become focused, organized, and calm
          <br />
          with the world #1 task manager: Todo App.
        </p>
        <button className="todo-btn" onClick={() => Navigate("./todo")}>
          Make todo list
        </button>
      </div>
    </div>
  );
};

export default Home;
