import {
  CheckCircleIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleRightIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
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
import { v4 as uuidv4 } from "uuid";

export default function SprintFive(props) {
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
  let [challenge, setChallenge] = useState();
  let fileInputRef = useRef(null);
  let [notificationMessage, setNotificationMessage] = useState();

  useEffect(() => {
    initProjectId();
    getSprintData();
    subscribeSprints();
    getVoteData();
    subscribeVote();
    getVoteTotal();
    getVoteStatusData();
    subscribeVoteStatus();
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
      .eq("category", "6")
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
      .channel("sprint-one-channel")
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

  async function getVoteData() {
    await supabase
      .from("votes")
      .select("*")
      .eq(
        "project_id",
        typeof projectId === "object" ? projectId.projectId : projectId
      )
      .eq("category", "6")
      .then((res) => {
        if (res.error) console.log(res.error);
        else setVoteData(res.data);
      });
  }

  function subscribeVote() {
    supabase
      .channel("votes-one-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "votes",
          filter: `project_id=eq.${
            typeof projectId === "object" ? projectId.projectId : projectId
          }`,
        },
        (payload) => {
          getVoteData();
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
        category: "6",
      },
    ]);
    setNotificationMessage("Silahkan Menunggu rekan yang lain");
    setIsOpenNotification(true);
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
      .eq("category", "6")
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

  async function resetVote() {
    await supabase
      .from("votes")
      .delete()
      .eq(
        "project_id",
        typeof projectId === "object" ? projectId.projectId : projectId
      )
      .eq("category", "6")
      .then(async (res) => {
        setIsResultOpen(false);
        await supabase
          .from("vote_status")
          .delete()
          .eq(
            "project_id",
            typeof projectId === "object" ? projectId.projectId : projectId
          )
          .eq("category", "6")
          .then((res) => {
            console.log(res);
            setIsVoteOpen(false);
          });
      });
  }

  async function getChallengeData() {
    await supabase
      .from("sprint")
      .select(
        `id, creator, category, sprint_details( category, content), project_id, status`
      )
      .eq("status", "1")
      .eq("category", "5")
      .eq(
        "project_id",
        typeof projectId === "object" ? projectId.projectId : projectId
      )
      .limit(1)
      .then((res) => {
        if (res.error) console.log(res.error);
        else {
          if (res.data != null) {
            setChallenge(
              res.data[0].sprint_details.filter(
                (item) => item.category == "hmw"
              )[0].content
            );
          } else {
            navigate("/sprint-one", { replace: true });
          }
        }
      });
  }

  function handleAdd() {
    setIsOpen(true);
  }

  function showIdeaDetails(index) {
    setDetail(index);
    setOpenDetail(true);
  }

  const calculateVoteSum = (voteData) => {
    const voteSum = [];
    voteData.forEach((vote) => {
      const { sprint_id } = vote;
      if (!voteSum[sprint_id]) {
        voteSum[sprint_id] = { sprint_id, vote_count: 1 };
      } else {
        voteSum[sprint_id].vote_count += 1;
      }
    });
    return voteSum.filter(Boolean);
  };

  const calculateVoteResults = (results) => {
    const maxVoteCount = Math.max(...results.map((item) => item.vote_count));
    const maxVoteSprintIds = results
      .filter((item) => item.vote_count === maxVoteCount)
      .map((item) => item.sprint_id);
    setMostVoted(maxVoteSprintIds);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        setNotificationMessage(`Filemu sedang diupload, harap menunggu!`);
        setIsOpenNotification(true);
        const fileData = new Blob([selectedFile], { type: selectedFile.type });
        await supabase.storage
          .from("crazy.ideate")
          .upload(`${uuidv4()}`, fileData)
          .then(async (bucketRes) => {
            await supabase
              .from("sprint")
              .insert([
                {
                  project_id: projectId,
                  creator: user.user_metadata.username,
                  category: "6",
                },
              ])
              .select()
              .then(async (res) => {
                console.log(bucketRes.data.path);
                await supabase
                  .from("sprint_details")
                  .insert([
                    {
                      category: "img_path",
                      content: bucketRes.data.path,
                      sprint_id: res.data[0].id,
                    },
                  ])
                  .select()
                  .then((res) => {
                    setIsOpenNotification(false);
                    setNotificationMessage(`Ide berhasil dibuat!`);
                    setIsOpenNotification(true);
                  });
              });
          });
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  async function finalizeSprint() {
    await supabase
      .from("sprint")
      .update({ status: "1" })
      .eq("id", mostVoted?.[0])
      .select()
      .then((res) => {
        console.log(res);
      });

    await supabase
      .from("projects")
      .update({ progress: Math.ceil((6 / 6) * 100) })
      .eq("id", typeof projectId === "object" ? projectId.projectId : projectId)
      .select();
  }

  useEffect(() => {
    if (voteData) {
      setIsResultOpen(voteData.length >= voteTotal);
      calculateVoteResults(calculateVoteSum(voteData));
      setIsLoading(false);
    }
  }, [voteData]);

  useEffect(() => {
    if (voteStatusData) {
      setIsVoteOpen(voteStatusData.length >= voteTotal);
    }
  }, [voteStatusData]);

  useEffect(() => {
    if (sprintData) {
      if (sprintData.some((data) => data.status == 1)) {
        navigate(`/result`, {
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
            Sprint Keenam
          </h1>
          <p className="text-lg py-2 tracking-tight text-gray-900">
            Crazy Ideate! Pada sprint ini kamu akan diajak membuat sketsa
            kemungkinan solusi untuk HMW yang sebelumnya kamu buat. Kalimat HMW
            kamu adalah <br />
            <span className="font-bold">"{challenge}"</span>.
          </p>
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
                  Upload sketsamu disini!
                </h1>
                {!voteStatusData?.some((data) => data.uuid === user.id) && (
                  <div className="max-h-full items-end justify-center md:justify-end flex flex-row md:flex-grow gap-4 md:gap-2 mt-2 md:mt-0">
                    <button
                      type="button"
                      onClick={() => handleClick()}
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
                className={`grid grid-cols-1 gap-4 justify-between rounded-lg min-h-[320px] mt-4 ${
                  sprintData?.length != 0 ? "md:grid-cols-3" : " "
                }`}
              >
                {sprintData?.length != 0 ? (
                  sprintData?.map((data, index) => {
                    let votes = voteData;
                    return (
                      <div className="mx-auto w-full h-auto" key={index}>
                        <ResponseCard
                          key={data.id}
                          data={data}
                          votes={votes}
                          isVoteOpen={isVoteOpen}
                        />
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
              <div className="px-6 py-6 lg:px-8 border border-4 border-dashed rounded-2xl my-8">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 my-auto">
                  Hasil Vote
                </h1>
                {mostVoted?.length > 1 ? (
                  <>
                    <Typography
                      as="h1"
                      color="gray"
                      className="text-2xl font-bold text-center mt-4"
                    >
                      Terdapat lebih dari satu ide yang mendapatkan vote
                      terbanyak, silahkan pilih salah satu ide untuk melanjutkan
                    </Typography>
                    <button
                      type="button"
                      onClick={() => {
                        resetVote();
                      }}
                      className="w-full mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-3 py-4 text-lg font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Reset vote
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-lg py-2 tracking-tight text-gray-900">
                      Dari hasil vote, ide yang paling banyak mendapatkan vote
                      adalah ide yang akan kamu lanjutkan di sprint selanjutnya,
                      yuk lihat hasilnya!
                    </p>
                    {sprintData && (
                      <div className="flex flex-row justify-between">
                        <ResultDetail
                          sprintData={sprintData?.filter(
                            (item) => item.id == mostVoted
                          )}
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => finalizeSprint()}
                      className="w-full mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-3 py-4 text-lg font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Finish
                      <ChevronDoubleRightIcon
                        className="ml-2 -mr-0.5 h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div>
              <input
                type="file"
                accept="image/*;capture=camera"
                capture="environment"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
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
      <NotificationDialog
        isOpen={isOpenNotification}
        setIsOpen={setIsOpenNotification}
        message={notificationMessage}
        title="Notification!"
      />
    </>
  );
}
