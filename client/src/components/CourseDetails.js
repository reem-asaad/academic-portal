import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/General.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [teacherName, setTeacherName] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const color = queryParams.get("color");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const config = {
          headers: {
            Authorization: token,
          },
        };

        const courseResponse = await axios.get(
          `http://localhost:5000/courses/${id}`,
          config
        );
        if (!courseResponse.data) {
          throw new Error("Course not found");
        }
        setCourse(courseResponse.data);

        const teacherResponse = await axios.get(
          `http://localhost:5000/users/${courseResponse.data.teacher}`,
          config
        );
        if (!teacherResponse.data) {
          throw new Error("Teacher not found");
        }
        setTeacherName(teacherResponse.data.name);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError("Failed to fetch course details");
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  
  return (
    <div>
      {course ? (
        <div>
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
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        <Link to="/courses">Courses</Link>
                      </li>
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
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        <a>Course Details</a>
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
              </div>
            </div>
            <div className="cards-group">
              <div className="card-details-container">
                {color && (
                  <div
                    style={{
                      backgroundColor: color,
                    }}
                    className="card-details-box"
                  ></div>
                )}
                <div className="card-details-content">
                  <div className="card-details-header-container">
                    <h2 className="card-details-name">{course.name}</h2>
                    <div className="card-details-dates">
                      <p className="card-date">
                        Starts {formatDate(course.startDate)}
                      </p>
                      <p className="card-end-date">
                        Ends Starts {formatDate(course.endDate)}
                      </p>
                    </div>
                  </div>
                  <p className="card-details-description">
                    {course.description}
                  </p>
                </div>
              </div>
              <div className="card-teacherd-container">
                {color && (
                  <div
                    style={{
                      backgroundColor: color,
                    }}
                    className="teacher-card"
                  >
                    <p className="teacher-card-title">Course Instructor</p>
                    <div className="card-teacherd">
                      <div className="card-teacherd-img"></div>
                      <span className="card-teacherd-sname">{teacherName}</span>
                    </div>
                    <span className="card-teacherd-sdesc">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="course-overview">
              <h3>Course Overview</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim
                tortor at auctor urna. Senectus et netus et malesuada fames ac.
                Magna ac placerat vestibulum lectus. Sit amet nisl suscipit
                adipiscing bibendum est ultricies integer. Commodo nulla
                facilisi nullam vehicula ipsum a arcu. Ut venenatis tellus in
                metus vulputate eu scelerisque felis imperdiet. Et magnis dis
                parturient montes nascetur ridiculus mus mauris vitae. Fames ac
                turpis egestas maecenas. Sit amet nisl suscipit adipiscing
                bibendum est ultricies. Faucibus nisl tincidunt eget nullam non.
                Sed velit dignissim sodales ut. Platea dictumst quisque sagittis
                purus sit amet volutpat consequat. Pellentesque id nibh tortor
                id aliquet lectus proin nibh nisl. Mattis ullamcorper velit sed
                ullamcorper morbi tincidunt ornare massa. Lorem mollis aliquam
                ut porttitor leo a. Lacus sed turpis tincidunt id aliquet risus
                feugiat in ante. Pulvinar mattis nunc sed blandit libero. Turpis
                massa tincidunt dui ut ornare lectus sit amet est.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CourseDetails;
