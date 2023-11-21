import React from "react";

export default function ResultDetail({ sprintData }) {
  
  return (
    <div className="mt-2">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Pengusung Ide: {sprintData?.[0]?.creator}
      </h3>
      <div>
        <h1 className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
          Spesific
        </h1>
        <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
          {
            sprintData?.[0]?.sprint_details?.filter(
              (item) => item?.category == "spesific"
            )[0].content
          }
        </p>
      </div>
      <div>
        <h1 className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
          Measurable
        </h1>
        <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
          Sebelum:{" "}
          {
            sprintData?.[0]?.sprint_details?.filter(
              (item) => item?.category == "measurable_before"
            )[0].content
          }
        </p>
        <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
          Seudah:{" "}
          {
            sprintData?.[0]?.sprint_details?.filter(
              (item) => item?.category == "measurable_after"
            )[0].content
          }
        </p>
      </div>
      <div>
        <h1 className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
          Timely
        </h1>
        <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
          {
            sprintData?.[0]?.sprint_details?.filter(
              (item) => item?.category == "timely"
            )[0].content
          }
        </p>
      </div>
      <div>
        <h1 className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
          Kalimat Challenge
        </h1>
        <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
          {
            sprintData?.[0]?.sprint_details?.filter(
              (item) => item?.category == "challenge"
            )[0].content
          }
        </p>
      </div>
    </div>
  );
}
