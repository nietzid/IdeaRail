import React, { useEffect, useState } from "react";
import supabase from "../../Supabase";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

export default function Result() {
  const { state } = useLocation();
  let [challenge, setChallenge] = useState();
  let [howMightWe, setHowMightWe] = useState();
  let [imageUrl, setImageUrl] = useState();
  let [projectId, setProjectId] = useState(state);
  let navigate = useNavigate();

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

  const fetchData = async () => {
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
      .eq("status", "1")
      .then((res) => {
        setImageUrl(
          supabase.storage
            .from("crazy.ideate")
            .getPublicUrl(
              res.data?.[0]?.sprint_details?.filter(
                (item) => item.category === "img_path"
              )[0]?.content
            )
        );
      });
  };

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
      .eq("category", "1")
      .eq("status", "1")
      .then((res) => {
        if (res.error) console.log(res.error);
        if (res.data[res.data.length - 1]?.sprint_details.length == 0) {
          getSprintData();
        } else {
          setChallenge(res.data[0]);
        }
      });
  }

  async function gethmw() {
    await supabase
      .from("sprint")
      .select(
        `id, creator, category, sprint_details( category, content), project_id, status`
      )
      .eq(
        "project_id",
        typeof projectId === "object" ? projectId.projectId : projectId
      )
      .eq("category", "5")
      .eq("status", "1")
      .then((res) => {
        if (res.error) console.log(res.error);
        if (res.data[res.data.length - 1]?.sprint_details.length == 0) {
          getSprintData();
        } else {
          setHowMightWe(res.data[0]);
        }
      });
  }

  useEffect(() => {
    initProjectId();
    fetchData();
    getSprintData();
    gethmw();
  }, []);

  return (
    <div className="flex flex-col mt-8 max-w-7xl mx-auto">
      <div className="flex flex-col w-full p-4 border border-4 border-dashed rounded-xl ">
        {/* Replace this with your sprint result data */}
        <div className="bg-white rounded-lg  p-4">
          <h1 className="text-3xl font-bold mb-2">Sprint Result</h1>
          <p className="mb-4">
            Selamat kamu telah berhasil menyelasikan sprint untuk project ini!
          </p>

          <h2 className="text-xl font-bold mb-2">Kalimat Challenge</h2>
          <p className="text-gray-600">
            {" "}
            {
              challenge?.sprint_details?.filter(
                (item) => item.category === "challenge"
              )[0]?.content
            }
          </p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">How Might We</h2>
          <p className="text-gray-600">
            {
              howMightWe?.sprint_details?.filter(
                (item) => item.category === "hmw"
              )[0]?.content
            }
          </p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Sketsa Solusi</h2>
          <figure className="max-w-lg">
            <img
              className="h-auto max-w-full rounded-lg"
              src={imageUrl?.data?.publicUrl}
              alt="Sketch image"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}
