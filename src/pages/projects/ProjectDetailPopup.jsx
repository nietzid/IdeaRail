import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import supabase from "../../Supabase";

import RocketAnimation from '../../assets/lottie/rocket.json';
import NotFoundAnimation from '../../assets/lottie/not-found.json';
import { ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

export default function ProjectDetailPopup({ isOpen, setIsOpen, projectsId }) {
  const [projectsData, setProjectsData] = useState(null);

  useEffect(() => {
    if(projectsId != null)
        getProjects();
}, [projectsId])

  async function getProjects() {
    await supabase
      .from("projects")
      .select("*")
      .eq("id", projectsId)
      .then((res) => {
        console.log(res);
        if (res.error) console.log(error);
        else setProjectsData(res?.data[0]);
      });
  }
  const isMobile = useMediaQuery({ maxWidth: 767 });
  if(isMobile)return (
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
                    {projectsData?.progress != 0 ? (
                      <div className="border shadow rounded-xl p-6 md:p-12 mx-auto my-auto">
                        <h1 className="text-4xl font-bold">Judul Project</h1>
                        <h1 className="text-3xl font-bold mt-8">Spesific</h1>
                        <p className="text-lg mt-2">
                          Spesific text, Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Accusamus saepe numquam, quos
                          laboriosam modi cumque, vel quaerat voluptate
                          reprehenderit ut perspiciatis porro voluptatem
                          deleniti tempore odio. Hic at odio laboriosam.
                        </p>
                        <h1 className="text-3xl font-bold mt-8">Measurable</h1>
                        <div className="flex col mt-2">
                          <p className="text-lg max-w-5/12 text-justify">
                            Spesific text, Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Accusamus saepe
                            numquam, quos laboriosam modi
                          </p>
                          <ArrowRightIcon className="max-w-2/12 max-h-24 px-4 my-auto" />
                          <p className="text-lg max-w-5/12 text-justify">
                            Spesific text, Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Accusamus saepe
                            numquam, quos laboriosam modi
                          </p>
                        </div>
                        <h1 className="text-3xl font-bold mt-8">Timely</h1>
                        <p className="text-lg mt-2">2 Bulan</p>
                        <h1 className="text-3xl font-bold mt-8">
                          Kalimat Challange
                        </h1>
                        <p className="text-lg mt-2">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Odit ab minus numquam, est cumque perspiciatis
                          eius tenetur dolor odio laudantium. Recusandae
                          doloremque aspernatur mollitia consequuntur sed atque
                          distinctio fugit? Est.
                        </p>
                        <div className="flex justify-end mt-2">
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
                          <Link
                            to={`/sprint-one`}
                            state={{ projectId: { projectsId } }}
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
