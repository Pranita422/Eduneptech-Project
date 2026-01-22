import React, { useState } from "react";

function CourseList() {
  const [showFY, setShowFY] = useState(false);
  const [showSY, setShowSY] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

  return (
    <div className="p-4">
      {/* B.Sc IT */}
      <div
        className="cursor-pointer text-xl font-bold text-violet-700"
        onClick={() => setShowCourses(!showCourses)}
      >
        B.Sc IT
      </div>

      {/* FY & SY */}
      {showCourses && (
        <div className="ml-6 mt-2 space-y-2">
          <div
            className="cursor-pointer text-lg font-medium text-blue-600"
            onClick={() => setShowFY(!showFY)}
          >
            FY
          </div>
          {showFY && (
            <div className="ml-4 text-gray-700">
              {/* Your FY content goes here */}
              Semester 1, Semester 2...
            </div>
          )}

          <div
            className="cursor-pointer text-lg font-medium text-blue-600"
            onClick={() => setShowSY(!showSY)}
          >
            SY
          </div>
          {showSY && (
            <div className="ml-4 text-gray-700">
              {/* Your SY content goes here */}
              Semester 3, Semester 4...
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CourseList;
