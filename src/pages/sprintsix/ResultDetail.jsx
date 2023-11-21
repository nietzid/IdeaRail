import React, { useEffect, useState } from "react";
import supabase from "../../Supabase";

export default function ResultDetail({ sprintData }) {
  const [imageUrl, setImageUrl] = useState();

  const fetchData = async () => {
    setImageUrl(
      supabase.storage
        .from("crazy.ideate")
        .getPublicUrl(
          sprintData?.[0]?.sprint_details?.filter(
            (item) => item.category === "img_path"
          )[0]?.content
        )
    );
  };

  useEffect(() => {
    fetchData();
  }, [sprintData]);

  return (
    <div className="mt-2">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Pengusung Ide: {sprintData?.[0]?.creator}
      </h3>
      <div>
        <h1 className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
          Sketsa
        </h1>
        <figure className="max-w-lg">
          <img
            className="h-auto max-w-full rounded-lg"
            src={imageUrl?.data?.publicUrl}
            alt="Sketch image"
          />
        </figure>
      </div>
    </div>
  );
}
