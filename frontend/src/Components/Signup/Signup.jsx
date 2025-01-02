import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/AuthSlice";
import toast from "react-hot-toast"; // Importing react-hot-toast for better notifications
import "./Signup.css";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_URL_V1 = import.meta.env.VITE_API_URL_V1;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const endpoint = isLogin ? `${API_URL_V1}/login` : `${API_URL_V1}/signup`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include", // This ensures cookies are sent with the request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result?.message || "Something went wrong.");
      } else {
        toast.success(
          isLogin ? "Login successful!" : "User created successfully!"
        );

        if (isLogin && result.user) {
          dispatch(login({ name: result.user.name, email: result.user.email }));
          localStorage.setItem("accessToken", result.user.accessToken);
          localStorage.setItem("user", JSON.stringify(result.user));
          navigate("/todo");
        } else {
          setIsLogin(true); // Switch to login after successful signup
        }

        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle" role="tablist">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
            role="tab"
            aria-selected={isLogin}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
            role="tab"
            aria-selected={!isLogin}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h2>{isLogin ? "Login here" : "Signup here"}</h2>

          {!isLogin && (
            <>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                {...register("name", {
                  required: !isLogin && "Name is required",
                })}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          {isLogin && <a href="#">Forgot Password?</a>}

          <button type="submit">{isLogin ? "Login" : "Signup"}</button>
          <p>
            {isLogin ? "Not a member?" : "Already have an account?"}{" "}
            <a
              href="#"
              onClick={() => setIsLogin(!isLogin)}
              style={{ cursor: "pointer" }}
            >
              {isLogin ? "Signup" : "Login"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
