import React, { useEffect, useState } from "react";
import supabase from "../../Supabase";
import ResourceCard from "../../components/ResourceCard";

export default function ResourceLayout({
  Center,
  CenterLeft,
  CenterRight,
  Navbar,
  HideMob,
}) {
  const [resourceData, setResourceData] = useState();
  const [resource, setResource] = useState();

  async function getResources() {
    await supabase
      .from("materi")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          console.log(data);
        } else {
          console.log(data);

          setResourceData(data);
          setResource(data[0]);
        }
      });
  }

  useEffect(() => {
    getResources();
  }, []);

  return (
    <div className="container flex flex-col min-h-screen min-w-full mx-auto dark:bg-gray-800 max-h-screen">
      <Navbar />
      <div
        className={`flex flex-col md:flex-row min-h-full min-w-screen p-0 m-0 dark:bg-gray-800 ${
          Center ? "md:my-auto" : ""
        }`}
      >
        {/* Left Layout */}
        <div
          className={`w-full px-6 md:px-12 max-h-1/3 md:w-1/2 bg-white md:h-full mx-auto md:order-1 dark:bg-gray-800 mt-1 ${
            CenterLeft ? "md:my-auto" : ""
          }`}
        >
          <div>
            <h1 className="text-left text-4xl font-bold mt-6 mb-0 md:ml-1">
              Resources
            </h1>
            <p className="my-2 text-left text-lg md:ml-1">
              Berikut merupakan video pembelajaran untuk membantu kamu memahami
              materi!
            </p>
          </div>
          <div className="overflow-y-auto md:max-h-[45rem] p-0 my-2 md:m-0 no-scrollbar">
            {resourceData?.map((resource, index) => (
              <div onClick={() => setResource(resourceData[index])}>
                <ResourceCard
                  key={resource.id}
                  title={resource.judul}
                  description={resource.deskripsi}
                  link={resource.link}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Right Layout */}
        <div
          className={`w-full px-6 md:px-12 max-h-2/3 md:w-1/2 bg-white md:h-full mx-auto md:order-2 dark:bg-gray-800 mt-1 ${
            CenterRight ? "md:my-auto" : ""
          } ${HideMob ? "hidden md:block" : ""}`}
        >
          <div className=" max-h-[20rem] md:max-h-[45rem] overflow-y-auto no-scrollbar mt-12">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="rounded-xl"
                src={resource?.link}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <h1 className="font-bold text-4xl leading-relaxed text-blue-gray-900 mx-1 my-4">
              {resource?.judul}
            </h1>
            <p className="block font-sans text-md font-normal leading-normal text-black antialiased m-2">
                {resource?.deskripsi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
