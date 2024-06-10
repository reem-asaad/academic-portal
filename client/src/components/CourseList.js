import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/General.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const CourseList = ({ courses, userRole, userId }) => {
  const colors = ["#3096CF", "#F6A11C", "#2CA249"];
  const [teacherNames, setTeacherNames] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherNames = async () => {
      const teacherIds = Array.from(
        new Set(courses.map((course) => course.teacher))
      );
      const teachers = {};
      await Promise.all(
        teacherIds.map(async (teacherId) => {
          try {
            const response = await axios.get(
              `http://localhost:5000/users/${teacherId}`,
              {
                headers: {
                  Authorization: localStorage.getItem("accessToken"),
                },
              }
            );
            if (response.data) {
              teachers[teacherId] = response.data.name;
            }
          } catch (error) {
            console.error("Error fetching teacher name:", error);
          }
        })
      );
      setTeacherNames(teachers);
    };

    fetchTeacherNames();
  }, [courses]);

  const filteredCourses =
    userRole === "teacher"
      ? courses.filter((course) => course.teacher === userId)
      : courses;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <div className="main-container">
      <div className="header-container">
        <div className="breadcrumb-container">
          <div className="logout-main-container">
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="/courses">Courses</Link>
                </li>
              </ul>
            </nav>
            <div className="logout-svg-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="logout-icon"
                onClick={handleLogout}
              >
                <path
                  fill-rule="evenodd"
                  d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <h1 className="main-title">Welcome back!</h1>
        </div>

        <div className="search-container">
          <div className="search-box">
            <input
              type="search"
              name="focus"
              placeholder="Search for courses"
              id="search-input"
              value=""
            ></input>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="search-icon"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="filter-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="filter-icon"
            >
              <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="courses-container">
        <div className="create-course-container">
          <h4 className="main-title">
            {userRole === "teacher" ? "Your Courses" : "Popular Courses"}
          </h4>
          {userRole === "teacher" && (
            <div className="create-course-button-container">
              <Link to="/courses/create" className="create-course-button">
                + Create New Course
              </Link>
            </div>
          )}
        </div>
        {filteredCourses.length === 0 ? (
          <div className="no-courses-message">
            <p>There are no courses available.</p>
          </div>
        ) : (
          <ul>
            {filteredCourses.map((course, index) => (
              <li key={course._id}>
                <Link
                  to={`/courses/${course._id}?color=${encodeURIComponent(
                    colors[index % colors.length]
                  )}`}
                >
                  {userRole === "teacher" && (
                    <Link to={`/courses/${course._id}/edit`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="edit-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Link>
                  )}
                  <div
                    className="card-header"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></div>
                  <div className="card-content">
                    <p className="card-date">
                      Starts {formatDate(course.startDate)}
                    </p>
                    <h3 className="card-course-title">{course.name}</h3>
                    <p className="card-course-desc">{course.description}</p>
                    <p className="card-course-cinst">
                      Course Instructor: {teacherNames[course.teacher]}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseList;
