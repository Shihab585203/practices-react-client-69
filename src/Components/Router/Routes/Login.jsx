import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import { FaGofore } from "react-icons/fa6";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const Login = () => {
  const { googleUser, setUser, signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleUser = () => {
    googleUser(provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        form.reset();

        const currentUser = {
          email: user.email,
        };

        console.log(currentUser);

        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("Practices-token", data.token);
            navigate(from, { replace: true });
          });

      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login Now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="font-semibold">
            New User? Please{" "}
            <Link to="/register" className="text-blue-700">
              Register Now
            </Link>
          </p>
          <p className="flex items-center font-semibold">
            Or Sign in with{" "}
            <Link>
              <FaGofore
                onClick={handleGoogleUser}
                className="text-blue-600 text-3xl ml-2"
              />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
