import React, { useEffect, useState } from "react";
import CreateCourse from "../components/CreateCourse";
import { jwtDecode } from "jwt-decode";

const CreateCoursePage = () => {
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Token:", token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { userId, userRole } = decodedToken;
        setUserId(userId);
        setUserRole(userRole);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("No token found.");
    }
  }, []);

  return (
    <div>
      <CreateCourse userId={userId} />
    </div>
  );
};

export default CreateCoursePage;
