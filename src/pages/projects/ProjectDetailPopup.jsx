import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import supabase from "../../Supabase";

import RocketAnimation from "../../assets/lottie/rocket.json";
import LoadingAnimation from "../../assets/lottie/loading.json";
import { ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function ProjectDetailPopup({ isOpen, setIsOpen, projectsId }) {
  const [projectsData, setProjectsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sprintData, setSprintData] = useState(null);

  useEffect(() => {
    if (projectsId != null) {
      getProjects();
      getSprintData();
    }
  }, [projectsId]);

  async function getProjects() {
    await supabase
      .from("projects")
      .select("*")
      .eq("id", projectsId)
      .then((res) => {
        if (res.error) console.log(error);
        else {
          setProjectsData(res?.data[0]);
          setIsLoading(false);
        }
      });
  }

  async function getSprintData() {
    await supabase
      .from("sprint")
      .select(
        `id, creator, category, sprint_details( category, content), project_id, status`
      )
      .eq("project_id", projectsId)
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

  const isMobile = useMediaQuery({ maxWidth: 767 });
  if (isMobile)
    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    <>
                      {isLoading && (
                        <div className="border shadow rounded-xl p-6 md:p-12 mx-auto my-auto">
                          <Lottie
                            animationData={LoadingAnimation}
                            loop={true}
                            className="h-64 w-auto"
                          />
                          <h6 className="mb-4 text-xl font-bold text-center text-gray-800 md:text-3xl">
                            <p className="font-extra-bold">
                              Loading Project...
                            </p>
                          </h6>
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
                            Mohon tunggu sebentar ya!
                          </p>
                        </div>
                      )}
                      {projectsData?.progress != 0 ? (
                        <div className="border shadow rounded-xl p-6 md:p-12 mx-auto my-auto">
                          <h1 className="text-2xl font-bold">
                            {projectsData?.title}
                          </h1>
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
                          <h1 className="text-xl font-bold mt-8">
                            Kalimat Challange
                          </h1>
                          <p className="text-lg mt-2">
                            {
                              sprintData?.sprint_details?.filter(
                                (item) => item.category == "challenge"
                              )[0]?.content
                            }
                          </p>
                          <div className="flex justify-end mt-2">
                            <Link
                              to={`/sprint-one`}
                              state={{ projectId: projectsId }}
                            >
                              <button
                                type="button"
                                className="block md:hidden inline-flex justify-end items-center rounded-md border border-transparent bg-indigo-600 px-4 py-4 text-base font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                      ) : (
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
                            Kamu belum memulai project ini, klik tombol dibawah
                            untuk memulai
                          </p>

                          <div className="flex justify-center mt-2">
                            <Link to={"/sprint-one"} state={projectsId}>
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
                      )}{" "}
                    </>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
