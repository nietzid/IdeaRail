import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ResourceCard from "../../components/ResourceCard";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import supabase from "../../Supabase";
import ResourcePopup from "./ResourcePopup";
import { Link } from "react-router-dom";
import ProjectsFormCard from "../projects/ProjectsFormCard";
import ProjectsCard from "../../components/ProjectsCard";
import { useAuth } from "../../context/AuthProvider";

export default function Home() {
  const [resources, setResources] = useState();
  const [resource, setResource] = useState();
  const [lastProject, setLastProject] = useState();
  const [showResources, setShowResources] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  async function getResources() {
    await supabase
      .from("materi")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        } else {
          setResources(data);
        }
      });
  }

  async function getLastProject() {
    await supabase
      .from("projects")
      .select("*")
      .eq("group_id", user.user_metadata.group_id)
      .order("updated_at", { ascending: false })
      .limit(1)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        } else {
          setLastProject(data);
        }
      });
  }

  useEffect(() => {
    getResources();
    getLastProject();
  }, []);

  useEffect(() => {
    if (lastProject?.length) setLastProject(lastProject[0]);
  }, [lastProject]);

  useEffect(() => {
    getLastProject();
  }, [isOpen]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div>
          <div className="bg-indigo-600 pb-32">
            <header className="py-2">
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-row mt-4 md:mt-8">
                  <div className="flex items-center">
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                      Selamat datang, <br /> {user.user_metadata.username}
                    </h3>
                  </div>
                </div>
              </div>
            </header>
          </div>
          <main className="-mt-36">
            <div className="mx-auto">
              <h1 className="text-left text-4xl font-bold mt-6 mb-0 md:ml-1"></h1>
              <div className="card w-11/12 glass mx-auto md:hidden">
                <div className="card-body p-6 text-gray-800">
                  <h2 className="card-title text-2xl font-bold text-white">
                    Project Terakhir
                  </h2>
                  <p className="font-bold text-xl text-white">
                    {lastProject?.title}
                  </p>
                  <p className=" text-sm">{lastProject?.description}</p>
                  <div className="card-actions justify-end">
                    <Link
                      to={`/sprint-one`}
                      state={{ projectId: lastProject?.id }}
                    >
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Lanjutkan
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="flex w-full px-4  mx-auto md:hidden"
                onClick={() => setIsOpen(true)}
              >
                <button
                  type="button"
                  className="inline-flex justify-center w-full mt-2 items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Project Baru
                  <PlusCircleIcon className="ml-1 h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              {/* Main 3 column grid */}
              <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8 px-4 mt-4 sm:px-6 lg:px-8">
                {/* Left column */}
                <div className="grid grid-cols-1 gap-4 lg:col-span-2 p-0 md:p-4 md:glass rounded-xl">
                  <section aria-labelledby="section-1-title">
                    <div className="overflow-hidden rounded-lg mb-4">
                      <div>
                        <h1 className="text-2xl md:text-3xl text-indigo-800 md:text-white font-bold pl-2 my-4">
                          Rekomendasi Materi
                        </h1>
                        <div className="flex flex-col gap-2">
                          {resources?.map((resource, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setResource(resources[index]);
                                setShowResources(true);
                              }}
                            >
                              <ResourceCard
                                resource={resource}
                                key={resource.id}
                                title={resource.judul}
                                description={resource.deskripsi}
                                link={resource.link}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right column */}
                <div className="flex flex-row gap-4 hidden md:block">
                  <div className="flex flex-row justify-between items-center my-auto">
                    <h2 className="card-title w-fit text-gray-100 text-3xl font-bold">
                      Project Terakhir
                    </h2>
                    <div
                      className="pr-4 mb-4 hidden md:block"
                      onClick={() => setIsOpen(true)}
                    >
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-bold text-indigo-600 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Project Baru
                        <PlusCircleIcon
                          className="ml-1 h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                  <ProjectsCard
                    title={lastProject?.title}
                    description={lastProject?.description}
                    progress={lastProject?.progress}
                  />
                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/sprint-one`}
                      state={{ projectId: lastProject?.id }}
                    >
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Lanjutkan
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ProjectsFormCard isOpen={isOpen} setIsOpen={setIsOpen} />
      <ResourcePopup
        resource={resource}
        isOpen={showResources}
        onClose={() => setShowResources(false)}
      />
    </>
  );
}
