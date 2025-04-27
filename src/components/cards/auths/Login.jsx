import { useState, useEffect } from "react";
import AuthCard from "../../../layouts/AuthCard"
import { useNavigate } from "react-router-dom";
import { usePostSignIn, fetchUserInfo } from "../../../services/authenticationService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const { data, loading, error, postSignIn } = usePostSignIn();

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const userInfo = await fetchUserInfo();// Fetch user details

      if(userInfo?.rol == "Admin"){
        navigate("/adminDashboard");
      } else if (userInfo?.rol == "Worker"){
        navigate("/workerDashboard");
      }
    };

    checkToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Username:", username, "Password:", password);

    await postSignIn(username, password);
    const userInfo = await fetchUserInfo();// Fetch user details

    if(userInfo?.rol == "Admin"){
      navigate("/adminDashboard");
    } else if (userInfo?.rol == "Worker"){
      navigate("/workerDashboard");
    }

  };

  return (
      <AuthCard title="Login">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Username</label>
            <input
              type="username"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </AuthCard>
  );
};

export default Login;