import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import supabase from "../../Supabase";
import { useAuth } from "../../context/AuthProvider";
import { useEffect, useState } from "react";

export default function ResponseCard({ data, votes, isVoteOpen }) {
  const { user } = useAuth();
  const [isLoading, setIsloading] = useState(true);
  const [vote, setVote] = useState(true);
  const [imageUrl, setImageUrl] = useState();

  function handleCheck(uuid) {
    return votes?.some((item) => uuid == item.uuid);
  }
  useEffect(() => {
    setVote(
      votes?.filter((vote) => {
        return vote.sprint_id == data.id;
      })
    );
    setIsloading(handleCheck(user.id));
  }, [votes]);

  async function handleUpVote(e) {
    e.stopPropagation();
    setIsloading(true);
    if (!handleCheck(user.id)) {
      await supabase
        .from("votes")
        .insert([
          {
            sprint_id: data.id,
            uuid: user.id,
            category: "6",
            project_id: data.project_id,
          },
        ])
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const fetchData = async () => {
    setImageUrl(
      supabase.storage
        .from("crazy.ideate")
        .getPublicUrl(
          data?.sprint_details?.filter(
            (item) => item.category === "img_path"
          )[0]?.content
        )
    );
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <Card className="w-auto min-h-full border-4 justify-between">
      <CardBody>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 truncate font-bold"
        >
          {data?.creator}{" "}
        </Typography>

        <figure className="max-w-lg">
          <img
            className="h-auto max-w-full rounded-lg"
            src={imageUrl?.data?.publicUrl}
            alt="Sketch image"
          />
        </figure>
      </CardBody>
      <CardFooter className="pt-0 flex w-full mx-auto">
        <Button
          disabled={isLoading ? true : false}
          className={`mr-2 mb-2 flex flex-row items-center justify-center w-full ${
            isLoading ? "bg-blue-400" : "bg-blue-600"
          }
                        ${isVoteOpen ? "block" : "hidden"}`}
          onClick={(e) => e.currentTarget === e.target && handleUpVote(e)}
        >
          Vote {vote?.length}{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
