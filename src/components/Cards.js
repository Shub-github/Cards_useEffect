// cards me sare course aa rhe hai to idr maping ke through hum only single course hi card component ko forward karegai.

// Ek function use kr rhe hai jo hai "getCourses" ye function ek single array create kr rha hai jo courses aa rhe hai different category ke unse.Fir iss function koo hum Card component mei as a prop pass karegai.

// reason for single array is : idr response format alag hai like
// {
//     "data": {
//         "Development": [{''},{''},{''}]
//          "Business": [{''},{''},{''}]
//     }
// }
// isliye single array use kiya

import React from "react";
import Card from "./Card";
import { useState } from "react";

const Cards = (props) => {
  let courses = props.courses;
  let category = props.category;
  const [likedCourses, setLikedCourses] = useState([]);

  function getCourses() {
    if (category === "All") {
      let allCourse = [];
      //   object value ko nikalne ke liyes
      Object.values(courses).forEach((array) => {
        array.forEach((courseData) => {
          allCourse.push(courseData);
        });
      });
      return allCourse;
    } else {
      return courses[category];
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      {getCourses().map((course) => (
        <Card
          key={course.id}
          course={course}
          likedCourses={likedCourses}
          setLikedCourses={setLikedCourses}
        />
      ))}
    </div>
  );
};

export default Cards;
