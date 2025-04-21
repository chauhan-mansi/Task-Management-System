import React, { useEffect, useState } from "react";
import { getUser } from "../../api";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getUser(token);
        console.log("User data received:", userData);

        if (userData?.success && userData?.data) {
          setUser(userData.data);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        console.error("Failed to load user:", err);
        setError("Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) return <div className="p-4">Loading user data...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-xl mt-20">
      <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-700">
        User Profile
      </h2>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {user.role || "User"}
        </p>
        <p>
          <span className="font-semibold">Joined On:</span>{" "}
          {user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
