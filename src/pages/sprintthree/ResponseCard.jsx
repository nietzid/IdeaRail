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

export default function ResponseCard({ data }) {
  const { user } = useAuth();
  const [isLoading, setIsloading] = useState(true);
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
        <Typography>
          <p className="font-bold">{"Pertanyaan Wawancara: "}</p>
          {
            data?.sprint_details?.filter(
              (item) => item.category == "interview_question"
            )[0]?.content
          }{" "}
        </Typography>
        <Typography>
          <p className="font-bold">{"Ditujukan Kepada: "}</p>
          {
            data?.sprint_details?.filter(
              (item) => item.category == "interview_type"
            )[0]?.content
          }{" "}
        </Typography>
      </CardBody>
    </Card>
  );
}
