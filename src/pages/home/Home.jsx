import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ResourceCard from "../../components/ResourceCard";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import supabase from "../../Supabase";
import ResourcePopup from "./ResourcePopup";

export default function Home() {
  const [resources, setResources] = useState();
  const [resource, setResource] = useState();
  const [lastProject, setLastProject] = useState();
  const [showResources, setShowResources] = useState(false);
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
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        }else{
          setLastProject(data);
        }
      });
  }

  useEffect(() => {
    getResources();
    getLastProject();
  }, []);

  useEffect(() => {
    if(lastProject?.length)setLastProject(lastProject[0]);
  }, [lastProject]);

  console.log(lastProject);
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
                      Selamat datang, <br /> Arfiansyah!
                    </h3>
                  </div>
                </div>
              </div>
            </header>
          </div>
          <main className="-mt-36">
            <div className="flex justify-end w-full pr-4 md:hidden">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-indigo-600 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Project Baru
                <PlusCircleIcon className="ml-1 h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mx-auto">
              <h1 className="text-left text-4xl font-bold mt-6 mb-0 md:ml-1"></h1>
              <div className="card w-11/12 glass mx-auto md:hidden">
                <div className="card-body text-white">
                  <h2 className="card-title text-2xl font-bold">
                    Project Terakhir
                  </h2>
                  <p className="font-bold text-xl">{lastProject?.title}</p>
                  <p className="text-black">
                    {lastProject?.description}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Lanjutkan
                    </button>
                  </div>
                </div>
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
                <div className="grid grid-cols-1 gap-4 hidden md:block">
                  <section aria-labelledby="section-2-title">
                    <div className="overflow-hidden rounded-lg bg-blue shadow">
                      <div>
                        <div className="card glass mx-auto">
                          <div className="card-body text-white">
                            <h2 className="card-title text-2xl md:text-3xl font-bold">
                              {lastProject.title}
                            </h2>
                            <p className="font-bold text-xl">Title</p>
                            <p className="text-black">
                              {lastProject.description}
                            </p>
                            <div className="card-actions justify-end">
                              <a
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Lanjutkan
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ResourcePopup
      resource={resource}
        isOpen={showResources}
        onClose={() => setShowResources(false)}
      />
    </>
  );
}
