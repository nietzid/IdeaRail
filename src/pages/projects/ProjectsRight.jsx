import {
  ArrowRightIcon,
  ChevronRightIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import supabase from "../../Supabase";
import { Link } from "react-router-dom";
import RocketAnimation from "../../assets/lottie/rocket.json";
import NotFoundAnimation from "../../assets/lottie/not-found.json";
import LoadingAnimation from "../../assets/lottie/loading.json";

import Lottie from "lottie-react";

export default function ProjectsRight({ currentProject, setCurrentProject }) {
  const [projectsData, setProjectsData] = useState(null);
  const [sprintData, setSprintData] = useState(null);

  useEffect(() => {
    if (currentProject != null) {
      getProjects();
      getSprintData();
    }
  }, [currentProject]);

  async function getProjects() {
    await supabase
      .from("projects")
      .select("*")
      .eq("id", currentProject)
      .then((res) => {
        if (res.error) console.log(error);
        else setProjectsData(res?.data[0]);
      });
  }

  async function getSprintData() {
    await supabase
      .from("sprint")
      .select(
        `id, creator, category, sprint_details( category, content), project_id, status`
      )
      .eq("project_id", currentProject)
      .eq("category", "1")
      .eq("status", "1")
      .then((res) => {
        if (res.error) console.log(res.error);
        if (res.data[res.data.length - 1]?.sprint_details.length == 0) {
          getSprintData();
        } else {
          setSprintData(res.data[0]);
        }
      });
  }

  if (currentProject != null) {
    return (
      <>
        {(() => {
          if (projectsData == null) {
            return (
              <div className="border shadow rounded-xl p-6 md:p-12 mx-auto my-auto">
                <Lottie
                  animationData={LoadingAnimation}
                  loop={true}
                  className="h-64 w-auto"
                />
                <h6 className="mb-4 text-xl font-bold text-center text-gray-800 md:text-3xl">
                  <p className="font-extra-bold">Loading Project...</p>
                </h6>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
                  Mohon tunggu sebentar ya!
                </p>
              </div>
            );
          } else {
            if (projectsData?.progress != 0) {
              return (
                <div className="border shadow rounded-xl md:p-12 mx-auto my-auto">
                  <h1 className="text-2xl font-bold">{projectsData.title}</h1>
                  <h1 className="text-xl font-bold mt-8">Spesific</h1>
                  <p className="text-lg mt-2">
                    {
                      sprintData?.sprint_details?.filter(
                        (item) => item.category == "spesific"
                      )[0]?.content
                    }
                  </p>
                  <h1 className="text-xl font-bold mt-8">Measurable</h1>
                  <div className="flex col mt-2">
                    <p className="text-lg max-w-5/12 text-justify">
                      {
                        sprintData?.sprint_details?.filter(
                          (item) => item.category == "measurable_before"
                        )[0]?.content
                      }
                    </p>
                    <ArrowRightIcon className="max-w-2/12 max-h-8 px-4 my-auto" />
                    <p className="text-lg max-w-5/12 text-justify">
                      {
                        sprintData?.sprint_details?.filter(
                          (item) => item.category == "measurable_after"
                        )[0]?.content
                      }
                    </p>
                  </div>
                  <h1 className="text-xl font-bold mt-8">Timely</h1>
                  <p className="text-lg mt-2">
                    {
                      sprintData?.sprint_details?.filter(
                        (item) => item.category == "timely"
                      )[0]?.content
                    }
                  </p>
                  <h1 className="text-xl font-bold mt-8">Kalimat Challange</h1>
                  <p className="text-lg mt-2">
                    {
                      sprintData?.sprint_details?.filter(
                        (item) => item.category == "challenge"
                      )[0]?.content
                    }
                  </p>
                  <div className="flex justify-end mt-2">
                    <Link to={`/sprint-one`} state={{ projectId: projectsData.id }}>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Resume
                        <ChevronRightIcon
                          className="-ml-1 ml-3 h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="border shadow rounded-xl p-6 md:p-12 mx-auto my-auto">
                  <Lottie
                    animationData={RocketAnimation}
                    loop={true}
                    className="h-64 w-auto"
                  />
                  <h6 className="mb-4 text-xl font-bold text-center text-gray-800 md:text-3xl">
                    <p className="font-extra-bold">
                      Project {projectsData?.title} belum dimulai!
                    </p>
                  </h6>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
                    Kamu belum memulai project ini, klik tombol dibawah untuk
                    memulai
                  </p>

                  <div className="flex justify-center mt-2">
                    <Link
                      to={`/sprint-one`}
                      state={{ projectId: currentProject }}
                    >
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Mulai
                        <ChevronRightIcon
                          className="-ml-1 ml-3 h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            }
          }
        })()}
      </>
    );
  } else {
    return (
      <div className="border shadow rounded-xl p-6 md:p-12 mx-auto my-auto">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Kamu belum memilih project!
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Pilih salah satu project yang sudah kamu buat untuk memulai
        </p>
        <Lottie
          animationData={NotFoundAnimation}
          loop={true}
          className="h-64 w-auto"
        />
      </div>
    );
  }
}
