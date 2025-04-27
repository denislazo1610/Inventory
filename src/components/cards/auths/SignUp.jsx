import { useState } from "react";
import AuthCard from "../../../layouts/AuthCard";
import { useNavigate } from "react-router-dom";
import { usePostSignIn, fetchUserInfo , signUpWorker } from "../../../services/authenticationService";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dni, setDni] = useState("");

    const { data, loading, error, postSignIn } = usePostSignIn();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
        const worker = {
          "username": username,
          "password": password,
          "dni": dni
        }
        const response = await signUpWorker(worker);
        console.log("response:", response);

        await postSignIn(username, password);
        const userInfo = await fetchUserInfo();// Fetch user details

        if(userInfo?.rol == "Admin"){
          navigate("/adminDashboard");
        } else if (userInfo?.rol == "Worker"){
          navigate("/workerDashboard");
        }

      } else {
        alert("Passwords do not match");
      }
    };


    return (
        <AuthCard title="Sign Up">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2">Username</label>
              <input
                type="text"
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
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2">DNI</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </form>
        </AuthCard>
    );
};

export default SignUp;