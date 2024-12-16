import React from 'react';
import { Link } from 'react-router-dom';
//import './CourseLinks.css';

const CourseLinks = () => {
  const courses = [
    { name: 'Python', path: '/courses/python' },
    { name: 'JavaScript', path: '/courses/javascript' },
    { name: 'Java', path: '/courses/java' },
    { name: 'C++', path: '/courses/cpp' },
    { name: 'Web Development', path: '/courses/webdev' },
    { name: 'Data Science', path: '/courses/datascience' },
  ];

  return (
    <div className='course-links'>
      {courses.map((course, index) => (
        <Link key={index} to={course.path} className='dropdown-item'>
          {course.name}
        </Link>
      ))}
    </div>
  );
};

export default CourseLinks;
