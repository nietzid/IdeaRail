import React from "react";

export default function ResourceCard({ key, title, description, link }) {
  const match = link.match(/(?:embed\/|v=)(.*?)(?:\?|&|$)/);
  const videoId = match && match[1];
  
  return (
    <div className="relative flex w-full h-auto md:h-40 flex-col md:flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md border mt-2 p-1  overflow-hidden">
      <div className="overflow-hidden rounded-xl bg-white bg-clip-border w-full md:w-3/12">
        <img
          src={
            "https://i.ytimg.com/vi/" +
            videoId +
            "/maxresdefault.jpg"
          }
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-2 md:p-6 flex-col overflow-hidden w-9/12">
        <h1 className="block font-sans text-lg md:text-2xl font-medium leading-relaxed text-blue-gray-900 antialiased ">
          {title}
        </h1>
        <p className="block font-sans text-sm md:text-base mt-1 font-normal leading-normal text-gray-900 antialiased opacity-75 truncate md:whitespace-normal">
          {description}
        </p>
      </div>
    </div>
  );
}
