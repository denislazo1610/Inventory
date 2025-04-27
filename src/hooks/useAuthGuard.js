import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../services/authenticationService";

const useAuthGuard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const userData = await fetchUserInfo();
      if (!userData) {
        navigate("/");
      } else {
        setUser(userData);
        setLoading(false);
      }
    };

    checkToken();

    const onStorageChange = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }
    };

    window.addEventListener("storage", onStorageChange);

    return () => window.removeEventListener("storage", onStorageChange);
  }, [navigate]);

  return { user, loading };
};

export default useAuthGuard;