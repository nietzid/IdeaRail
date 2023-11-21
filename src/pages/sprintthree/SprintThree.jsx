import {
  CheckCircleIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleRightIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import ResponseCard from "./ResponseCard";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../../Supabase";
import SprintForm from "./SprintForm";
import Lottie from "lottie-react";
import EmptyAnimation from "../../assets/lottie/empty.json";
import { Typography } from "@material-tailwind/react";
import { ReactSession } from "react-client-session";
import IdeaDetail from "./IdeaDetail";
import { useAuth } from "../../context/AuthProvider";
import NotificationDialog from "../../components/NotificationDialog";
import ResultDetail from "./ResultDetail";
import LoadingAnimation from "../../assets/lottie/loading.json";
import ExistingProcess from "./ExistingProcess";

export default function SprintThree(props) {
  const { user } = useAuth();
  let navigate = useNavigate();
  const { state } = useLocation();
  let [sprintData, setSprintData] = useState(null);
  let [isOpenNotification, setIsOpenNotification] = useState(false);
  let [voteData, setVoteData] = useState(null);
  let [voteTotal, setVoteTotal] = useState(0);
  let [voteStatusData, setVoteStatusData] = useState(null);
  let [openDetail, setOpenDetail] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [detail, setDetail] = useState(0);
  let [projectId, setProjectId] = useState(state);
  let [mostVoted, setMostVoted] = useState();
  let [isVoteOpen, setIsVoteOpen] = useState(false);
  let [isResultOpen, setIsResultOpen] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [showExisting, setShowExisting] = useState(false);

  useEffect(() => {
    initProjectId();
    getSprintData();
    subscribeSprints();
  }, []);

  function initProjectId() {
    if (projectId) {
      setProjectId(
        typeof projectId === "object" ? projectId.projectId : projectId
      );
      ReactSession.set("projectId", projectId);
    } else {
      ReactSession.get("projectId");
    }
    if (projectId == null) {
      return navigate("/projects", { replace: true });
    }
  }

  async function getSprintData() {
    await supabase
      .from("sprint")
      .select(
        `id, creator, category, sprint_details( category, content), project_id, status`
      )
      .eq(
        "project_id",
        typeof projectId === "object" ? projectId.projectId : projectId
      )
      .eq("category", "3")
      .then((res) => {
        if (res.error) console.log(res.error);
        if (res.data[res.data.length - 1]?.sprint_details.length == 0) {
          getSprintData();
        } else {
          setSprintData(res.data);
        }
      });
  }

  const subscribeSprints = () =>
    supabase
      .channel("sprint-three-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sprint",
          filter: `project_id=eq.${
            typeof projectId === "object" ? projectId.projectId : projectId
          }`,
        },
        (payload) => {
          getSprintData();
        }
      )
      .subscribe();

  function handleAdd() {
    setIsOpen(true);
  }

  function showIdeaDetails(index) {
    setDetail(index);
    setOpenDetail(true);
  }

  async function finalizeSprint() {
    await supabase
      .from("sprint")
      .update({ status: "1" })
      .eq("id", sprintData?.[0].id)
      .select()
      .then((res) => {
        console.log(res);
      });

    await supabase
      .from("projects")
      .update({ progress: Math.ceil((3 / 6) * 100) })
      .eq("id", typeof projectId === "object" ? projectId.projectId : projectId)
      .select();
  }

  useEffect(() => {
    if (sprintData != null) {
      if (sprintData.some((data) => data.status == 1)) {
        navigate(`/sprint-four`, {
          state: {
            projectId:
              typeof projectId === "object" ? projectId.projectId : projectId,
          },
        });
      }
      setIsLoading(false);
    }
    setIsResultOpen(sprintData?.length >= 5);
  }, [sprintData]);

  return (
    <>
      <header className="bg-white mx-4 md:mx-16 mt-4">
        <div className="mx-auto max-w-screen py-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Sprint Ketiga
          </h1>
          <p className="text-lg py-2 tracking-tight text-gray-900">
            Pada Sprint ini kamu harus menentukan pertanyaan wawancara yang akan
            kamu ajukan kepada pengguna maupun ahli, lalu kamu juga harus
            menentukan siapa pengguna maupun ahli yang akan kamu wawancara.
            Pertanyaan wawancara mencari pain point dari existing process yang
            sebelumnya kamu cari tahu. Masukan setidaknya total 5 pertanyaan per
            kelompok sebelum melanjutkan
          </p>
          <button
            type="button"
            onClick={() => setShowExisting(true)}
            className="w-55 justify-center inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Lihat Existing Process
            <PlusCircleIcon
              className="ml-2 -mr-0.5 h-6 w-6"
              aria-hidden="true"
            />
          </button>
        </div>
      </header>
      <main className="mx-4 md:mx-16">
        {isLoading ? (
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
        ) : (
          <>
            <div className="mx-auto max-w-full mx-8 py-6 sm:px-6 lg:px-8 flex flex-col border-4 border-dashed rounded-3xl border-gray-200 mx-4 px-4 h-fit">
              <div className="flex flex-col md:flex-row justify-items-stretch rounded-lg h-fit">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 my-auto">
                  Yuk Sampaikan Idemu!
                </h1>

                <div className="max-h-full items-end justify-center md:justify-end flex flex-row md:flex-grow gap-4 md:gap-2 mt-2 md:mt-0">
                  <button
                    type="button"
                    onClick={() => handleAdd()}
                    className="w-full md:w-32 justify-center inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Tambah
                    <PlusCircleIcon
                      className="ml-2 -mr-0.5 h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
              <div
                className={`grid grid-cols-1 gap-4 justify-between rounded-lg min-h-[320px] mt-4 ${
                  sprintData?.length != 0 ? "md:grid-cols-3" : " "
                }`}
              >
                {sprintData?.length != 0 ? (
                  sprintData?.map((data, index) => {
                    return (
                      <div
                        className="mx-auto w-full h-auto"
                        onClick={() => showIdeaDetails(index)}
                        key={index}
                      >
                        <ResponseCard key={data.id} data={data} />
                      </div>
                    );
                  })
                ) : (
                  <div className="mx-auto">
                    <Lottie
                      animationData={EmptyAnimation}
                      loop={true}
                      className="h-64 w-auto "
                    />
                    <Typography
                      as="h1"
                      color="gray"
                      className="text-2xl font-bold text-center"
                    >
                      Belum ada data
                    </Typography>
                  </div>
                )}{" "}
              </div>
            </div>
            <div
              className={`w-full my-auto ${isResultOpen ? "block" : "hidden"}`}
            >
              <div className="my-8">
                <button
                  type="button"
                  onClick={() => finalizeSprint()}
                  className="w-full mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-3 py-4 text-lg font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Lanjut Ke Sprint 4
                  <ChevronDoubleRightIcon
                    className="ml-2 -mr-0.5 h-6 w-6"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </main>
      <SprintForm isOpen={isOpen} setIsOpen={setIsOpen} projectId={projectId} />
      <IdeaDetail
        isOpen={openDetail}
        setIsOpen={setOpenDetail}
        sprintData={sprintData?.[detail]}
      />
      <ExistingProcess
        isOpen={showExisting}
        setIsOpen={setShowExisting}
        projectId={
          typeof projectId === "object" ? projectId.projectId : projectId
        }
      />
    </>
  );
}
