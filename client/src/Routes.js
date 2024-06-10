import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from "./pages/RegisterPage";
import CourseListPage from "./pages/CourseListPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import EditCoursePage from "./pages/EditCoursePage";

const CustomRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />{" "}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/courses" element={<CourseListPage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
        <Route path="/courses/create" element={<CreateCoursePage />} />
        <Route path="/courses/:id/edit" element={<EditCoursePage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default CustomRoutes;
