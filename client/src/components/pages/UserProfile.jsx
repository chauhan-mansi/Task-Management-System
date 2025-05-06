import React, { useEffect, useState } from "react";
import { getUser } from "../../api";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { VscAccount } from "react-icons/vsc";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };

  if (loading)
    return (
      <div className="p-4 text-lg text-gray-700">Loading user data...</div>
    );
  if (error) return <div className="p-4 text-lg text-red-600">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-[650px] w-full rounded-xl overflow-hidden bg-white shadow-[0_0_1.5rem_rgba(0,0,0,0.1)] sm:p-10 p-8">
        <div className="card">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-8">
            <div className="col-span-1 sm:col-span-2 bg-gray-100 rounded-lg p-8 flex justify-center items-center">
              <VscAccount className="text-gray-600 w-28 h-28" />
            </div>
            <div className="col-span-1 sm:col-span-3 p-8">
              <div className="font-bold text-2xl text-gray-900 mb-6">
                User Profile
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Name:</span> {user.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Role:</span>{" "}
                  {user.role || "User"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Joined On:</span>{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="mt-8">
                <Button
                  variant="contained"
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
