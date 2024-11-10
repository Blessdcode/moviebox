import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className=" h-screen w-full hero-bg">
       
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/src/assets/Logo- light.svg" alt="logo" className="" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Login
          </h1>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
                value="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="••••••••"
                id="password"
                value="password"
              />
            </div>

            <button
              className="w-full py-2 bg-green text-white font-semibold rounded-md">
              Login
            </button>
          </form>
          <div className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link to={"/sign-up"} className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;