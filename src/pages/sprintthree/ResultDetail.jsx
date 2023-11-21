import React from "react";

export default function ResultDetail({ sprintData }) {
  
  return (
    <div className="mt-2">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Pengusung Ide: {sprintData?.[0]?.creator}
      </h3>
      <div>
        <h1 className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
          Pertanyaan
        </h1>
        <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
          {
            sprintData?.[0]?.sprint_details?.filter(
              (item) => item?.category == "interview_question"
            )[0]?.content
          }
        </p>
      </div>
      <div>
        <h1 className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
          Ditujukan untuk
        </h1>
        <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
          {
            sprintData?.[0]?.sprint_details?.filter(
              (item) => item?.category == "interview_type"
            )[0]?.content
          }
        </p>
      </div>
    </div>
  );
}
