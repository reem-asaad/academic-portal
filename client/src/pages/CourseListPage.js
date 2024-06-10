import React, { useEffect, useState } from "react";
import CourseList from "../components/CourseList";
import Sidebar from "../components/Sidebar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let url = "http://localhost:5000/courses";
        // if (userRole === "teacher" && userId) { 
        //   url += `?teacher=${userId}`;
        // }
        const response = await axios.get(url, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        setCourses(response.data);
        
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [userRole, userId]);

  return (
    <div>
      {/* <Sidebar /> */}
      <CourseList courses={courses} userRole={userRole} userId={userId} />
    </div>
  );
};

export default CourseListPage;
