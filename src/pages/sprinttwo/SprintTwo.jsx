import {
  CheckCircleIcon,
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
import ResultDetail from "../sprintone/ResultDetail";
export default function SprintTwo(props) {
  const { user } = useAuth();
  let navigate = useNavigate();
  const { state } = useLocation();
  let [sprintData, setSprintData] = useState(null);
  let [isOpenNotification, setIsOpenNotification] = useState(false);
  let [voteStatusData, setVoteStatusData] = useState(null);
  let [openDetail, setOpenDetail] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [detail, setDetail] = useState(0);
  let [projectId, setProjectId] = useState(state);
  let [voteTotal, setVoteTotal] = useState(0);
  let [isResultOpen, setIsResultOpen] = useState(false);
  let [challenge, setChallenge] = useState();
  let [notificationMessage, setNotificationMessage] = useState();
  let [notificationTitle, setNotificationTitle] = useState();

  useEffect(() => {
    initProjectId();
    getSprintData();
    subscribeSprints();
    getVoteStatusData();
    subscribeVoteStatus();
    getVoteTotal();
    getChallengeData();
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
      .eq("category", "2")
      .then((res) => {
        if (res.error) console.log(res.error);
        if (res.data[res.data.length - 1]?.sprint_details.length == 0) {
          getSprintData();
        } else {
          setSprintData(res.data);
        }
      });
  }

  async function getChallengeData() {
    await supabase
      .from("sprint")
      .select(
        `id, creator, category, sprint_details( category, content), project_id, status`
      )
      .eq("status", "1")
      .eq("category", "1")
      .eq("project_id", typeof projectId === "object" ? projectId.projectId : projectId)
      .limit(1)
      .then((res) => {
        if (res.error) console.log(res.error);
        else {
          if (res.data != null) {
            setChallenge(
              res.data[0].sprint_details.filter(
                (item) => item.category == "challenge"
              )[0].content
            );
          } else {
            navigate("/sprint-one", { replace: true });
          }
        }
      });
  }

  const subscribeSprints = () =>
    supabase
      .channel("sprint-two-channel")
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

  async function getVoteStatusData() {
    initProjectId();
    await supabase
      .from("vote_status")
      .select("*")
      .eq(
        "project_id",
        typeof projectId === "object" ? projectId.projectId : projectId
      )
      .eq("category", "2")
      .then((res) => {
        if (res.error) console.log(res.error);
        else setVoteStatusData(res.data);
      });
  }

  function subscribeVoteStatus() {
    supabase
      .channel("vote-status-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "vote_status" },
        (payload) => {
          getVoteStatusData();
        }
      )
      .subscribe();
  }

  async function getVoteTotal() {
    await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("group_id", user.user_metadata.group_id)
      .then((res) => {
        setVoteTotal(res.count);
      });
  }

  async function handleAddVoteStatus() {
    initProjectId();
    await supabase.from("vote_status").insert([
      {
        project_id:
          typeof projectId === "object" ? projectId.projectId : projectId,
        category: "2",
      },
    ]);
    setNotificationMessage("Silahkan Menunggu rekan yang lain");
    setNotificationTitle("Terima kasih");
    setIsOpenNotification(true);
  }

  async function finalizeSprint() {
    if (sprintData.length != 0) {
      await supabase
        .from("sprint")
        .update({ status: "1" })
        .eq("id", sprintData?.[0].id)
        .select();

      await supabase
        .from("projects")
        .update({ progress: Math.ceil((2 / 6) * 100) })
        .eq(
          "id",
          typeof projectId === "object" ? projectId.projectId : projectId
        )
        .select();
    } else {
      setNotificationMessage("Silahkan masukan ide sebelum melanjutkan!");
      setNotificationTitle("Gagal");
      setIsOpenNotification(true);
      await supabase
        .from("vote_status")
        .delete()
        .eq(
          "project_id",
          typeof projectId === "object" ? projectId.projectId : projectId
        )
        .eq("category", "2")
        .then((res) => {
          if (res.error) console.log(res.error);
        });
    }
  }

  useEffect(() => {
    if (voteStatusData) {
      setIsResultOpen(voteStatusData?.length >= voteTotal);
    }
  }, [voteStatusData]);

  useEffect(() => {
    if (sprintData) {
      if (sprintData.some((data) => data.status == 1)) {
        navigate(`/sprint-three`, {
          state: {
            projectId:
              typeof projectId === "object" ? projectId.projectId : projectId,
          },
        });
      }
    }
  }, [sprintData]);

  return (
    <>
      <header className="bg-white mx-4 md:mx-16 mt-4">
        <div className="mx-auto max-w-screen py-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Sprint Kedua
          </h1>
          <p className="text-lg py-2 tracking-tight text-gray-900">
            Pada Sprint ini kamu harus menelaah dan menentukan existing process
            yang saat ini terjadi pada challenge yang ingin kamu selesaikan.
            Kalimat challenge kamu adalah <br />
            <span className="font-bold">"{challenge}"</span>.
          </p>
        </div>
      </header>
      <main className="mx-4 md:mx-16">
        <div className="mx-auto max-w-full mx-8 py-6 sm:px-6 lg:px-8 flex flex-col border-4 border-dashed rounded-3xl border-gray-200 mx-4 px-4">
          <div className="flex flex-col md:flex-row justify-items-stretch rounded-lg max-h-24">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 my-auto">
              Yuk Sampaikan Idemu!
            </h1>
            {!voteStatusData?.some((data) => data.uuid === user.id) && (
              <div className="max-h-full items-end justify-center md:justify-end flex flex-row md:flex-grow gap-4 md:gap-2 mt-2 md:mt-0">
                <button
                  type="button"
                  onClick={() => handleAdd()}
                  className="w-32 justify-center inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Tambah
                  <PlusCircleIcon
                    className="ml-2 -mr-0.5 h-6 w-6"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => handleAddVoteStatus()}
                  className={`ml-4 w-32 inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                >
                  Selesai
                  <CheckCircleIcon
                    className="ml-2 -mr-0.5 h-6 w-6"
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
          </div>
          <div
            className={`grid grid-cols-1 gap-4 rounded-lg min-h-[320px] mt-4 ${
              sprintData?.length != 0 ? "md:grid-cols-3" : " "
            }`}
          >
            {sprintData?.length != 0 ? (
              sprintData?.map((data, index) => {
                return (
                  <div
                    className="mx-auto w-full h-64"
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
        <div className={`w-full my-auto ${isResultOpen ? "block" : "hidden"}`}>
          <button
            type="button"
            onClick={() => finalizeSprint()}
            className="w-full mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-3 py-4 text-lg font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Lanjut Ke Sprint 3
            <ChevronDoubleRightIcon
              className="ml-2 -mr-0.5 h-6 w-6"
              aria-hidden="true"
            />
          </button>
        </div>
      </main>
      <SprintForm isOpen={isOpen} setIsOpen={setIsOpen} projectId={projectId} />
      <IdeaDetail
        isOpen={openDetail}
        setIsOpen={setOpenDetail}
        sprintData={sprintData?.[detail]}
      />
      <NotificationDialog
        isOpen={isOpenNotification}
        setIsOpen={setIsOpenNotification}
        message={notificationMessage}
        title={notificationTitle}
      />
    </>
  );
}
