import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import ProjectsCard from "../../components/ProjectsCard";
import ProjectsFormCard from "./ProjectsFormCard";
import supabase from "../../Supabase";
import { useAuth } from "../../context/AuthProvider";

export default function ProjectsLeft({ currentProject, setCurrentProject }) {
  let [isOpen, setIsOpen] = useState(false);
  let [projectsData, setProjectsData] = useState();
  const { user } = useAuth();

  useEffect(() => {
    getProjects();
    subscribe();
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  async function getProjects() {
    // let { data: projects, error } = await supabase.from("projects").select("*").then((res) => {
    //     if (res.error) console.log(error);
    //     else setProjectsData(res.data);
    //   });

    await supabase
      .from("projects")
      .select("*")
      .eq("group_id", user.user_metadata.group_id)
      .then((res) => {
        if (res.error) console.log(error);
        else setProjectsData(res.data);
      });
  }

  const subscribe = () =>
    supabase
      .channel("projects-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
          filter: `group_id=eq.${user.user_metadata.group_id}`,
        },
        (payload) => {
          getProjects();
        }
      )
      .subscribe();

  return (
    <>
      <div className="p-1">
        <div className="flex justify-between my-4">
          <h1 className="text-4xl font-bold max-w-fit">Projects</h1>
          <button
            type="button"
            onClick={openModal}
            className="hidden md:inline-flex justify-end items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusCircleIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            Project Baru
          </button>
          <button
            type="button"
            onClick={openModal}
            className="block md:hidden inline-flex justify-end items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusCircleIcon
              className="-ml-0.5 mr-2 h-4 w-4"
              aria-hidden="true"
            />
            New Project
          </button>
        </div>
        <div className="overflow-y-auto md:max-h-[45rem] no-scrollbar">
          {projectsData ? (
            projectsData.map((project, index) => {
              return (
                <ProjectsCard
                  key={index}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  progress={project.progress}
                  setCurrentProject={setCurrentProject}
                />
              );
            })
          ) : (
            <div className="flex justify-center items-center min-h-full">
              <p className="text-2xl font-bold text-gray-400">Loading...</p>
            </div>
          )}{" "}
        </div>
      </div>
      <ProjectsFormCard isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
